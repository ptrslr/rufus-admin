// @flow

import firebase from 'firebase/app';
import 'firebase/database';

const rootRef = firebase.database().ref();
const categoriesRef = rootRef.child(`categories`);
const categoryKeysRef = rootRef.child(`categoryKeys`);

export const fetchCategories = async () => {
  return fetch('api/categories').then(res => {
    return res;
  });
};
export const fetchCategoryKeys = async () => {
  const categoryKeys = (await categoryKeysRef.once('value')).val();

  return categoryKeys ? categoryKeys : [];
};

export const createCategory = async (name: string) => {
  const categoryId = categoriesRef.push().key;

  let categoryKeys = await fetchCategoryKeys();
  categoryKeys.push(categoryId);

  const updates = {};
  updates[`/categories/${categoryId}`] = name;
  updates[`/categoryKeys`] = categoryKeys;

  return rootRef.update(updates);
};

export const deleteCategory = async (id: string, keys: Array<string>) => {
  categoryKeysRef.set(keys);
  return categoriesRef.child(id).remove();
};

export const updateCategoryKeys = (keys: Array<string>) => {
  return rootRef.child(`categoryKeys`).update(keys);
};
