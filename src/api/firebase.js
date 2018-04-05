// @flow
import firebase from 'firebase/app';
import 'firebase/database';
import { RawDraftContentState } from 'draft-js';

const config = {
  apiKey: 'AIzaSyA0_eG1U3QHIKbr4UpmW8GLrH5YbF_La_E',
  authDomain: 'project-rufus.firebaseapp.com',
  databaseURL: 'https://project-rufus.firebaseio.com',
  projectId: 'project-rufus',
  storageBucket: 'project-rufus.appspot.com',
  messagingSenderId: '83992737225',
};

export default firebase.initializeApp(config);

export const createPost = (
  title: string,
  subtitle: string,
  content: RawDraftContentState
) => {
  const postId = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;

  firebase
    .database()
    .ref(`posts/${postId}`)
    .set({
      title,
      subtitle,
      content,
    });
};
