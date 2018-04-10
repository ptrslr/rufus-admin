'use strict';

module.exports = function(router) {
  var categories = require('../controllers/categoryController');

  // posts Routes
  router
    .route('/categories')
    .get(categories.getCategories)
    .post(categories.createCategory);

  router
    .route('/categories/keys')
    .get(categories.getCategoryKeys)
    .put(categories.updateCategoryKeys);

  router
    .route('/categories/:categoryId')
    .get(categories.getCategory)
    .put(categories.updateCategory)
    .delete(categories.deleteCategory);
};
