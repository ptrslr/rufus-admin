'use strict';
const admin = require('firebase-admin');
const axios = require('axios');

const rootRef = admin.database().ref();
const categoriesRef = admin.database().ref('/categories');
const categoryKeysRef = admin.database().ref('/categoryKeys');

const handleError = function(error, res) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return res.status(error.response.status).send(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return res.send(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    return res.status(500).send(error.message);
  }
};

exports.getCategories = function(req, res) {
  return axios
    .get('https://project-rufus.firebaseio.com/categories.json', {
      params: req.query,
    })
    .then(function(response) {
      return res.json(response.data);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.getCategoryKeys = function(req, res) {
  return axios
    .get('https://project-rufus.firebaseio.com/categoryKeys.json', {
      params: req.query,
    })
    .then(function(response) {
      return res.json(response.data);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.updateCategoryKeys = function(req, res) {
  const keys = req.body.keys;

  if (keys) {
    axios
      .put('https://project-rufus.firebaseio.com/categoryKeys.json', {
        keys,
      })
      .then(function(response) {
        console.log(response);
        return res.json({ message: 'Categories updated!' });
      })
      .catch(function(err) {
        handleError(err, res);
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
