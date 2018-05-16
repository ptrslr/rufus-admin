// @flow

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

import status from '../constants/status';
import role from '../constants/role';

const config = {
  apiKey: 'AIzaSyA0_eG1U3QHIKbr4UpmW8GLrH5YbF_La_E',
  authDomain: 'project-rufus.firebaseapp.com',
  databaseURL: 'https://project-rufus.firebaseio.com',
  projectId: 'project-rufus',
  storageBucket: 'project-rufus.appspot.com',
  messagingSenderId: '83992737225',
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

const rootRef = firebase.database().ref();
const postsRef = rootRef.child('posts');
const postContentsRef = rootRef.child('postContents');
const categoriesRef = rootRef.child('categories');
const categoryKeysRef = rootRef.child('categoryKeys');
const teamRef = rootRef.child('team');

const authenticate = async (params = {}) => {
  const idToken = await auth.currentUser.getIdToken();

  params['auth'] = idToken;

  return params;
};

const handleError = err => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message);
  }
  console.log(err.config);
};

/*
  POSTS
 */
export const fetchPosts = async () => {
  const posts = (await postsRef.once('value')).val();

  return posts;
};
export const fetchPost = async (postId: string) => {
  const postRef = rootRef.child(`/posts/${postId}`);
  const postData = (await postRef.once('value')).val();

  return postData;
};

export const fetchPostContent = async (postId: string) => {
  const contentRef = rootRef.child(`/postContents/${postId}`);
  const contentData = (await contentRef.once('value')).val();

  return JSON.parse(contentData);
};

type Post = {
  title: string,
  subtitle: string,
  content: Object,
  status: $Keys<typeof status>,
  category: string,
  author: string,
};

export const createPost = (post: Post): void => {
  const postsRef = rootRef.child('posts');
  const contentsRef = rootRef.child('postContents');

  const postId = postsRef.push().key;

  const { title, subtitle, content, status, category, author } = post;
  const contentStr = JSON.stringify(content);

  const updates = {};
  updates[`posts/${postId}`] = {
    title,
    subtitle,
    status,
    category,
    author,
  };
  updates[`postContents/${postId}`] = contentStr;

  return rootRef.update(updates);
};

export const updatePost = (postId: string, post: Post) => {
  const { title, subtitle, content, status, category, author } = post;
  const contentStr = JSON.stringify(content);

  const updates = {};
  updates[`posts/${postId}`] = {
    title,
    subtitle,
    status,
    category,
    author,
  };
  updates[`postContents/${postId}`] = contentStr;

  return rootRef.update(updates);
};

/*
  CATEGORIES
 */

export const fetchCategories = async () => {
  const categories = (await categoriesRef.once('value')).val();

  return categories;
};

export const fetchCategoryKeys = async () => {
  const categoryKeys = (await categoryKeysRef.once('value')).val();

  return categoryKeys ? categoryKeys : [];
};

export const updateCategoryKeys = (keys: Array<string>) => {
  return rootRef.child(`categoryKeys`).update(keys);
};

export const createCategory = async (name: string) => {
  const categoryId = categoriesRef.push().key;

  let categoryKeys = await fetchCategoryKeys();
  categoryKeys.push(categoryId);

  const updates = {};
  updates[`/categories/${categoryId}`] = { name };
  updates[`/categoryKeys`] = categoryKeys;

  return rootRef.update(updates);
};

export const fetchCategory = async (categoryId: string) => {
  const category = (await categoriesRef.child(categoryId).once('value')).val();

  return category;
};

export const updateCategory = (categoryId: string, name: string) => {
  return categoriesRef
    .child(categoryId)
    .child('name')
    .set(name);
};

export const deleteCategory = async (id: string, keys: Array<string>) => {
  const updates = {};
  updates['categoryKeys'] = keys;
  updates[`categories/${id}`] = null;

  return rootRef.update(updates);
};

/*
  TEAM
 */
export const fetchTeam = async () => {
  try {
    const params = await authenticate();

    return await axios.get(`/api/team`, { params }).then(res => {
      return res.data;
    });
  } catch (err) {
    handleError(err);
  }
};

export const fetchActiveTeam = async () => {
  try {
    const params = await authenticate();

    return await axios.get(`/api/team/active`, { params }).then(res => {
      return res.data;
    });
  } catch (err) {
    handleError(err);
  }
};
export const fetchDisabledTeam = async () => {
  try {
    const params = await authenticate();

    return await axios.get(`/api/team/disabled`, { params }).then(res => {
      return res.data;
    });
  } catch (err) {
    handleError(err);
  }
};

export const createTeamMember = async (
  email: string,
  password: string,
  displayName: string,
  role: $Keys<typeof role>
) => {
  try {
    const params = await authenticate();

    return await axios
      .post('/api/team', { email, password, displayName, role }, { params })
      .then(res => {
        return res.data;
      });
  } catch (err) {
    handleError(err);
  }
};

export const disableTeamMember = async (uid: string) => {
  try {
    const params = await authenticate();

    const authPromise = axios.put(
      `/api/team/${uid}`,
      { disabled: true },
      { params }
    );

    const databasePromise = teamRef.child(uid).update({
      disabled: true,
    });

    return Promise.all([authPromise, databasePromise]);
  } catch (err) {
    handleError(err);
  }
};

export const enableTeamMember = async (uid: string) => {
  try {
    const params = await authenticate();

    const authPromise = axios.put(
      `/api/team/${uid}`,
      { disabled: false },
      { params }
    );

    const databasePromise = teamRef.child(uid).update({
      disabled: false,
    });

    return Promise.all([authPromise, databasePromise]);
  } catch (err) {
    handleError(err);
  }
};

export const updateTeamMember = async (uid: string, updates: Object) => {
  try {
    const params = await authenticate();

    console.log(updates);

    return axios.put(`/api/team/${uid}`, updates, { params });
  } catch (err) {
    handleError(err);
  }
};
