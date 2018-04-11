// @flow

export const fetchCategories = async () => {
  const categories = (await categoriesRef.once('value')).val();

  return categories;
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
