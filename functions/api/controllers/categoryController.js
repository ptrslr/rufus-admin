'use strict';
const admin = require('firebase-admin');

const rootRef = admin.database().ref();
const categoriesRef = admin.database().ref('/categories');
const categoryKeysRef = admin.database().ref('/categoryKeys');

exports.getCategories = function(req, res) {
  categoriesRef
    .once('value')
    .then(function(snap) {
      return res.json(snap.val());
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getCategoryKeys = function(req, res) {
  categoryKeysRef
    .once('value')
    .then(function(snap) {
      return res.json(snap.val());
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateCategoryKeys = function(req, res) {
  const keys = req.body.keys;

  if (keys) {
    categoryKeysRef
      .set(keys)
      .then(function() {
        return res.json({ message: 'Categories updated!' });
      })
      .catch(function(err) {
        res.send(err);
      });
  } else {
    res.send(new Error('Keys are missing!'));
  }
};

exports.createCategory = function(req, res) {
  const categoryId = categoriesRef.push().key;

  categoryKeysRef
    .once('value')
    .then(function(snap) {
      const categoryKeys = snap.val();

      const newCategoryIndex = categoryKeys ? categoryKeys.length : 0;

      const updates = {};
      updates['/categories/' + categoryId] = req.body.name;
      updates['/categoryKeys/' + newCategoryIndex] = categoryId;

      return rootRef.update(updates);
    })
    .then(function() {
      return res.json({ message: 'Category created!' });
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getCategory = function(req, res) {
  const categoryId = req.params.categoryId;

  categoriesRef
    .child(categoryId)
    .once('value')
    .then(function(snap) {
      return res.json(snap.val());
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateCategory = function(req, res) {
  categoriesRef
    .child(req.params.categoryId)
    .set(req.body.name)
    .then(function() {
      return res.json({ message: 'Category updated!' });
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deleteCategory = function(req, res) {
  categoryKeysRef
    .once('value')
    .then(function(snap) {
      const keys = snap.val();
      const categoryId = req.params.categoryId;

      if (categoryId) {
        const categoryIndex = keys.indexOf(categoryId);

        // categoryId is present in keys array
        if (categoryIndex >= 0) {
          let newKeys = Array.from(keys);
          newKeys.splice(categoryIndex, 1);

          const updates = {};
          updates['/categories/' + categoryId] = null;
          updates['/categoryKeys'] = newKeys;

          return rootRef.update(updates);
        }

        throw new Error('CategoryId does not exist');
      }

      throw new Error('Missing categoryId');
    })
    .then(function() {
      return res.json({ message: 'Category deleted' });
    })
    .catch(function(err) {
      res.send(err);
    });
};
