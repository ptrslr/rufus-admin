// @flow
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import status from '../constants/status';

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
const categoriesRef = rootRef.child(`categories`);
const categoryKeysRef = rootRef.child(`categoryKeys`);

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
  contentsRef.child(`${postId}`).set(contentStr);

  postsRef.child(`${postId}`).set({
    title,
    subtitle,
    status,
    category,
    author,
  });
};

export const updatePost = (postId: string, post: Post) => {
  const { title, subtitle, content, status, category, author } = post;

  const contentStr = JSON.stringify(content);

  rootRef.child(`posts/${postId}`).update({
    title,
    subtitle,
    status,
    category,
    author,
  });
  rootRef.child(`postContents/${postId}`).update(contentStr);
};
