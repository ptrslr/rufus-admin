'use strict';
const admin = require('firebase-admin');

const rootRef = admin.database().ref();
const categoriesRef = admin.database().ref('/categories');
const categoryKeysRef = admin.database().ref('/categoryKeys');

exports.getCategories = function(req, res) {
  categoriesRef.once(
    'value',
    function(snap) {
      res.json(snap.val());
    },
    function(err) {
      res.send(err);
    }
  );
};

exports.getCategoryKeys = function(req, res) {
  categoryKeysRef.once(
    'value',
    function(snap) {
      res.json(snap.val());
    },
    function(err) {
      res.send(err);
    }
  );
};

exports.updateCategoryKeys = function(req, res) {
  const keys = req.body.keys;

  if (keys) {
    categoryKeysRef.set(keys, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Categories updated!' });
      }
    });
  } else {
    res.send(new Error('Keys are missing!'));
  }
};

exports.createCategory = function(req, res) {
  const categoryId = categoriesRef.push().key;

  categoryKeysRef.once(
    'value',
    function(snap) {
      const categoryKeys = snap.val();

      const newCategoryIndex = categoryKeys ? categoryKeys.length : 0;

      const updates = {};
      updates['/categories/' + categoryId] = req.body.name;
      updates['/categoryKeys/' + newCategoryIndex] = categoryId;

      rootRef.update(updates, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: 'Category created!' });
        }
      });
    },
    function(err) {
      res.send(err);
    }
  );
};

exports.getCategory = function(req, res) {
  const categoryId = req.params.categoryId;

  categoriesRef.child(categoryId).once(
    'value',
    function(snap) {
      res.json(snap.val());
    },
    function(err) {
      res.send(err);
    }
  );
};

exports.updateCategory = function(req, res) {
  categoriesRef.child(req.params.categoryId).set(req.body.name, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Category updated!' });
    }
  });
};

exports.deleteCategory = function(req, res) {
  categoryKeysRef.once(
    'value',
    function(snap) {
      const keys = snap.val();

      const categoryId = req.params.categoryId;

      if (categoryId) {
        const categoryIndex = keys.indexOf(categoryId);

        let newKeys = Array.from(keys);
        newKeys.splice(categoryIndex, 1);

        const updates = {};
        updates['/categories/' + categoryId] = null;
        updates['/categoryKeys'] = newKeys;

        rootRef.update(updates, function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: 'Category deleted' });
          }
        });
      } else {
        res.send(new Error('Missing categoryId'));
      }
    },
    function(err) {
      res.send(err);
    }
  );
};
