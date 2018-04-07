// @flow
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyA0_eG1U3QHIKbr4UpmW8GLrH5YbF_La_E',
  authDomain: 'project-rufus.firebaseapp.com',
  databaseURL: 'https://project-rufus.firebaseio.com',
  projectId: 'project-rufus',
  storageBucket: 'project-rufus.appspot.com',
  messagingSenderId: '83992737225',
};

export default firebase.initializeApp(config);

const rootRef = firebase.database().ref();

export const fetchPost = async (postId: string) => {
  const postRef = rootRef.child(`/posts/${postId}`);
  const postData = (await postRef.once('value')).val();

  return postData;
};

export const fetchPostContent = async (contentId: string) => {
  const contentRef = rootRef.child(`/postContents/${contentId}`);
  const contentData = (await contentRef.once('value')).val();

  return JSON.parse(contentData);
};

export const createPost = (
  title: string,
  subtitle: string,
  content: Object
) => {
  const postsRef = rootRef.child('posts');
  const contentsRef = rootRef.child('postContents');

  const postId = postsRef.push().key;
  const contentId = contentsRef.push().key;

  const contentStr = JSON.stringify(content);

  contentsRef.child(`${contentId}`).set(contentStr);

  postsRef.child(`${postId}`).set({
    title,
    subtitle,
    contentId,
  });
};

export const updatePost = (
  id: string,
  title: string,
  subtitle: string,
  content: Object
) => {
  const contentStr = JSON.stringify(content);

  rootRef.child(`posts/${id}`).update({
    title,
    subtitle,
    contentStr,
  });
};
