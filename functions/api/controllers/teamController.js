'use strict';
const admin = require('firebase-admin');
const axios = require('axios');
const isEqual = require('lodash/isEqual');
const cloneDeep = require('lodash/cloneDeep');

const constants = require('../constants.js');

const url = constants.url;

const teamRef = admin.database().ref('/team');

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

const getUser = function(uid) {
  return admin
    .auth()
    .getUser(uid)
    .then(function(userRecord) {
      return userRecord;
    })
    .catch(function(err) {
      throw err;
    });
};

exports.createTeamMember = function(req, res) {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.displayName ||
    !req.body.role
  ) {
    return res.status(400).send('Missing parameters');
  }

  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }
      const user = {
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
      };

      return admin.auth().createUser(user);
    })
    .then(function(userRecord) {
      const uid = userRecord.uid;

      const setRolePromise = admin
        .auth()
        .setCustomUserClaims(uid, { role: req.body.role });

      const saveToDatabasePromise = teamRef.child(uid).set({
        disabled: false,
      });

      return Promise.all([setRolePromise, saveToDatabasePromise]);
    })
    .then(function() {
      return res.json({ message: 'Team member created!' });
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.getTeam = function(req, res) {
  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }

      return teamRef.once('value');
    })
    .then(function(snap) {
      return snap.val();
    })
    .then(function(uidsObject) {
      if (uidsObject === null) {
        return res.json(null);
      }

      const uids = Object.keys(uidsObject);

      const promises = uids.map(function(uid) {
        return getUser(uid);
      });

      // console.log(promises);

      return Promise.all(promises);
    })
    .then(function(results) {
      return res.json(results);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.getActiveTeam = function(req, res) {
  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }

      return teamRef
        .orderByChild('disabled')
        .equalTo(false)
        .once('value');
    })
    .then(function(snap) {
      return snap.val();
    })
    .then(function(uidsObject) {
      if (uidsObject === null) {
        return res.json(null);
      }

      const uids = Object.keys(uidsObject);

      const promises = uids.map(function(uid) {
        return getUser(uid);
      });

      // console.log(promises);

      return Promise.all(promises);
    })
    .then(function(results) {
      return res.json(results);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.getDisabledTeam = function(req, res) {
  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }

      return teamRef
        .orderByChild('disabled')
        .equalTo(true)
        .once('value');
    })
    .then(function(snap) {
      return snap.val();
    })
    .then(function(uidsObject) {
      if (uidsObject === null) {
        return res.json(null);
      }
      const uids = Object.keys(uidsObject);

      const promises = uids.map(function(uid) {
        return getUser(uid);
      });

      // console.log(promises);

      return Promise.all(promises);
    })
    .then(function(results) {
      return res.json(results);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.getTeamMember = function(req, res) {
  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }

      const userId = req.params.userId;

      return getUser(userId);
    })
    .then(function(user) {
      return res.json(user);
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.updateTeamMember = function(req, res) {
  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }
      const userId = req.params.userId;

      const updates = req.body;

      if (!updates) {
        return res.status(400).send(new Error('No updates'));
      }

      const role = updates.role;
      const userUpdates = updates;
      delete userUpdates.role;

      const promises = [];
      if (userUpdates) {
        promises.push(admin.auth().updateUser(userId, userUpdates));
      }
      if (role) {
        promises.push(admin.auth().setCustomUserClaims(userId, { role }));
      }

      return Promise.all(promises);
    })
    .then(function(userRecord) {
      return res.json({ message: 'Team member updated!' });
    })
    .catch(function(err) {
      handleError(err, res);
    });
};

exports.deleteTeamMember = function(req, res) {
  const idToken = req.query.auth;

  if (!idToken) {
    return res.status(401).send('Missing auth token');
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(claims) {
      if (claims.role !== 'admin') {
        return res.status(401).send('Not admin');
      }
      const uid = req.params.userId;

      const authPromise = admin.auth().deleteUser(uid);

      const databasePromise = teamRef.child(uid).set(null);

      return Promise.all([authPromise, databasePromise]);
    })
    .then(function(userRecord) {
      return res.json({ message: 'Successfully deleted team member!' });
    })
    .catch(function(err) {
      handleError(err, res);
    });
};
