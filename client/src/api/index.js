// @flow

import firebase from 'firebase/app';
import 'firebase/database';
import axios from 'axios';
import { auth } from './firebase.js';

const rootRef = firebase.database().ref();
const categoriesRef = rootRef.child(`categories`);
const categoryKeysRef = rootRef.child(`categoryKeys`);

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

const authenticate = async (params = {}) => {
  const idToken = await auth.currentUser.getIdToken();
  // console.log(idToken);

  params['auth'] = idToken;

  return params;
};

export const fetchCategories = async () => {
  try {
    const params = await authenticate();

    return await axios.get('api/categories', { params }).then(res => {
      return res.data;
    });
  } catch (err) {
    handleError(err);
  }
};
export const fetchCategoryKeys = async () => {
  try {
    const params = await authenticate();

    return await axios.get('api/categories/keys', { params }).then(res => {
      const categoryKeys = res.data;

      return categoryKeys ? categoryKeys : [];
    });
  } catch (err) {
    handleError(err);
  }
};

export const createCategory = async (name: string) => {
  try {
    const params = await authenticate();

    return await axios
      .post('api/categories', { name }, { params })
      .then(res => {
        return res.data;
      });
  } catch (err) {
    handleError(err);
  }
};

export const updateCategory = async (categoryId: string, name: string) => {
  try {
    const params = await authenticate();

    return await axios
      .put(`api/categories/${categoryId}`, { name }, { params })
      .then(res => {
        return res.data;
      });
  } catch (err) {
    handleError(err);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const params = await authenticate();

    return await axios
      .delete(`api/categories/${categoryId}`, { params })
      .then(res => {
        return res.data;
      });
  } catch (err) {
    handleError(err);
  }
};

export const updateCategoryKeys = async (keys: Array<string>) => {
  try {
    const params = await authenticate();

    return await axios
      .put(`api/categories/keys`, { keys }, { params })
      .then(res => {
        return res.data;
      });
  } catch (err) {
    handleError(err);
  }
};
