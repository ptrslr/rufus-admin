// @flow

import firebase from 'firebase/app';
import 'firebase/database';
import qs from 'qs';

const rootRef = firebase.database().ref();
const categoriesRef = rootRef.child(`categories`);
const categoryKeysRef = rootRef.child(`categoryKeys`);

export const fetchCategories = () => {
  return fetch('api/categories')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Not ok ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};
export const fetchCategoryKeys = () => {
  return fetch('api/categories/keys')
    .then(res => {
      if (res.ok) {
        const categoryKeys = res.json();

        return categoryKeys ? categoryKeys : [];
      }
      throw new Error(`Not ok ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

export const createCategory = async (name: string) => {
  const form = {
    name,
  };

  const init = {
    method: 'POST',
    body: qs.stringify(form),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  };

  return fetch('api/categories', init)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Not ok ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteCategory = (categoryId: string) => {
  const init = {
    method: 'DELETE',
    body: qs.stringify({
      categoryId,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  };
  return fetch(`api/categories/${categoryId}`, init)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Not ok ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateCategoryKeys = (keys: Array<string>) => {
  const init = {
    method: 'PUT',
    body: qs.stringify({
      keys,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  };
  return fetch(`api/categories/keys`, init)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Not ok ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};
