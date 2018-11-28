// @flow

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

import role from '../constants/role';
import type { Post, Poll } from '../utils/types';

import config from '../firebase-config.js';

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export default firebase;

export const rootRef = firebase.database().ref();
export const postsRef = rootRef.child('posts');
// const postContentsRef = rootRef.child('postContents');
export const pollsRef = rootRef.child('polls');
export const categoriesRef = rootRef.child('categories');
export const categoryKeysRef = rootRef.child('categoryKeys');
export const pagesRef = rootRef.child('pages');
export const teamRef = rootRef.child('team');

export const authenticate = async (params = {}) => {
  const idToken = await firebaseAuth.currentUser.getIdToken();

  params['auth'] = idToken;

  return params;
};

export const handleError = err => {
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

export const createPost = (post: Post, poll: Poll = null): Promise<string> => {
  const postsRef = rootRef.child('posts');
  // const contentsRef = rootRef.child('postContents');

  const postId = postsRef.push().key;

  const {
    title,
    subtitle,
    content,
    contentHTML,
    author,
    status,
    featured,
    paid,
    category,
    image,
    publishTime = null,
  } = post;

  const contentStr = JSON.stringify(content);

  const updates = {};
  updates[`posts/${postId}`] = {
    title,
    subtitle,
    author,
    status,
    featured,
    paid,
    category,
    image,
    publishTime,
  };
  updates[`postContents/${postId}`] = contentStr;
  updates[`postContentsHTML/${postId}`] = contentHTML;
  updates[`polls/${postId}`] = poll;

  return rootRef.update(updates).then(() => {
    return postId;
  });
};

export const updatePost = (postId: string, post: Post, poll: Poll = null) => {
  const { content, contentHTML, ...postUpdates } = post;

  const updates = {};
  updates[`posts/${postId}`] = postUpdates;

  if (content) {
    const contentStr = JSON.stringify(content);
    updates[`postContents/${postId}`] = contentStr;
  }

  if (contentHTML) {
    updates[`postContentsHTML/${postId}`] = contentHTML;
  }

  if (poll) {
    updates[`polls/${postId}`] = poll;
  }

  // console.log(updates);

  return rootRef.update(updates);
};

export const deletePost = (postId: string) => {
  const updates = {};
  updates[`posts/${postId}`] = null;
  updates[`postContents/${postId}`] = null;
  updates[`postContentsHTML/${postId}`] = null;
  updates[`polls/${postId}`] = null;

  return rootRef.update(updates);
};

/* ==========================================================================
   Polls
   ========================================================================== */
export const createPoll = (postId: string, poll: Poll): Promise<string> => {
  return pollsRef.child(postId).set(poll);
};

export const fetchPoll = async (postId: string) => {
  const pollRef = pollsRef.child(postId);
  const pollData = (await pollRef.once('value')).val();

  return pollData;
};

export const deletePoll = (postId: string): Promise<void> => {
  return pollsRef.child(postId).remove();
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
  PAGES
 */
export const fetchPages = async () => {
  const pages = (await pagesRef.once('value')).val();

  return pages;
};
export const fetchPage = async (pageId: string) => {
  const pageRef = rootRef.child(`/pages/${pageId}`);
  const pageData = (await pageRef.once('value')).val();

  return pageData;
};

export const fetchPageContent = async (pageId: string) => {
  const contentRef = rootRef.child(`/pageContents/${pageId}`);
  const contentData = (await contentRef.once('value')).val();

  return JSON.parse(contentData);
};

export const createPage = (page: Page): Promise<string> => {
  // const contentsRef = rootRef.child('postContents');

  const pageId = pagesRef.push().key;

  const { title, subtitle, content, contentHTML } = page;
  const contentStr = JSON.stringify(content);

  const updates = {};
  updates[`pages/${pageId}`] = {
    title,
    subtitle,
  };
  updates[`pageContents/${pageId}`] = contentStr;
  updates[`pageContentsHTML/${pageId}`] = contentHTML;

  return rootRef.update(updates).then(() => {
    return pageId;
  });
};

export const updatePage = (pageId: string, page: Page) => {
  const { content, contentHTML, ...pageUpdates } = page;

  const updates = {};
  updates[`pages/${pageId}`] = pageUpdates;

  if (content) {
    const contentStr = JSON.stringify(content);
    updates[`pageContents/${pageId}`] = contentStr;
  }

  if (contentHTML) {
    updates[`pageContentsHTML/${pageId}`] = contentHTML;
  }

  return rootRef.update(updates);
};

export const deletePage = (pageId: string) => {
  const updates = {};
  updates[`pages/${pageId}`] = null;
  updates[`pageContents/${pageId}`] = null;
  updates[`pageContentsHTML/${pageId}`] = null;

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
  role: $Values<typeof role>
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

export const fetchTeamMember = async (uid: string) => {
  try {
    const params = await authenticate();

    return axios.get(`/api/team/${uid}`, { params }).then(res => {
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

    return axios.put(`/api/team/${uid}`, updates, { params });
  } catch (err) {
    handleError(err);
  }
};
