'use strict';
const admin = require('firebase-admin');
const axios = require('axios');
const isEqual = require('lodash/isEqual');
const cloneDeep = require('lodash/cloneDeep');

const constants = require('../constants.js');

const url = constants.url;

const rootRef = admin.database().ref();
const categoriesRef = admin.database().ref('/categories');
const categoryKeysRef = admin.database().ref('/categoryKeys');

const haveEqualValues = function(array1, array2) {
  const sortedArray1 = cloneDeep(array1).sort();
  const sortedArray2 = cloneDeep(array2).sort();

  return isEqual(sortedArray1, sortedArray2);
};

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
  // console.log(req.query);
  return axios
    .get(`${url}/categories.json`, {
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
    .get(`${url}/categoryKeys.json`, {
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
  const newKeys = req.body.keys;

  console.log(newKeys);
  if (newKeys) {
    return axios
      .get(`${url}/categoryKeys.json`, {
        params: {
          auth: req.query.auth,
        },
      })
      .then(function(response) {
        const keys = response.data;

        if (haveEqualValues(keys, newKeys)) {
          console.log(newKeys);
          return axios
            .put(`${url}/categoryKeys.json`, newKeys, {
              params: req.query,
            })
            .then(function(response) {
              return res.json({ message: 'Categories updated!' });
            })
            .catch(function(err) {
              handleError(err, res);
            });
        }
        return res.status(400).send(new Error('Keys contain different values'));
      })
      .catch(function(err) {
        handleError(err, res);
      });
  } else {
    return res.send(new Error('Keys are missing!'));
  }
};

exports.createCategory = function(req, res) {
  const categoryId = categoriesRef.push().key;

  return axios
    .get(`${url}/categoryKeys.json`, {
      params: {
        auth: req.query.auth,
      },
    })
    .then(function(response) {
      return response.data;
    })
    .then(function(categoryKeys) {
      // console.log('keys');
      // console.log(categoryKeys);
      const newCategoryIndex = categoryKeys ? categoryKeys.length : 0;

      const updates = {};
      updates['/categories/' + categoryId] = req.body.name;
      updates['/categoryKeys/' + newCategoryIndex] = categoryId;

      return axios
        .patch(`${url}/.json?`, updates, { params: req.query })
        .then(function(response) {
          return res.json({ message: 'Category created!' });
        })
        .catch(function(err) {
          handleError(err, res);
        });
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.getCategory = function(req, res) {
  const categoryId = req.params.categoryId;

  return axios
    .get(`${url}/categories/${categoryId}.json`, { params: req.query })
    .then(function(response) {
      return res.json(response.data);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.updateCategory = function(req, res) {
  const categoryId = req.params.categoryId;

  if (req.body.name === null || req.body.name === 'undefined') {
    return res.status(400).send(new Error('Bad name!'));
  }
  const update = {};
  update[categoryId] = req.body.name;

  return axios
    .patch(`${url}/categories.json`, update, {
      params: req.query,
    })
    .then(function(response) {
      return res.json({ message: 'Category updated!' });
    })
    .catch(function(err) {
      handleError(err, res);
    });
  // categoriesRef
  //   .child(req.params.categoryId)
  //   .set(req.body.name)
  //   .then(function() {
  //     return res.json({ message: 'Category updated!' });
  //   })
  //   .catch(function(err) {
  //     res.send(err);
  //   });
};

exports.deleteCategory = function(req, res) {
  return axios
    .get(`${url}/categoryKeys.json`, {
      params: {
        auth: req.query.auth,
      },
    })
    .then(function(response) {
      return response.data;
    })
    .then(function(keys) {
      const categoryId = req.params.categoryId;

      if (categoryId) {
        const categoryIndex = keys.indexOf(categoryId);

        if (categoryIndex >= 0) {
          let newKeys = Array.from(keys);
          newKeys.splice(categoryIndex, 1);

          const updates = {};
          updates['/categories/' + categoryId] = null;
          updates['/categoryKeys'] = newKeys;

          return axios
            .patch(`${url}/.json?`, updates, { params: req.query })
            .then(function(response) {
              return res.json({ message: 'Category deleted!' });
            })
            .catch(function(err) {
              handleError(err, res);
            });
        }

        return res.status(400).send('CategoryId does not exist');
      }

      return res.statuse(400).send('Missing categoryId');
    })
    .catch(function(err) {
      handleError(err, res);
    });
};
