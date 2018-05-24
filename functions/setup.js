#!/usr/bin/env node
const admin = require('firebase-admin');
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const inquirer = require('inquirer');

const firebaseConfig = require('./firebase-config.js');

const maxPasswordLength = 6; // firebase

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig.serviceAccount),
  databaseURL: firebaseConfig.url,
});
const teamRef = admin.database().ref('/team');

program.parse(process.argv);

// console.log('user: %s pass: %s', program.username, program.password);

// co(function*() {
//   const email = yield prompt('Email: ');
//   const password = yield prompt.password('Password: ');
//   const repeatPassword = yield prompt.password('Repeat password: ');
//   const displayName = yield prompt('Name: ');

//   console.log('user: %s', email);

//   createAdmin(email, password, displayName);
// });

const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Email:',
    validate: function(value) {
      if (validateEmail(value)) {
        return true;
      } else {
        return 'Please enter your e-mail address.';
      }
    },
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password:',
    validate: function(value) {
      if (value.length >= maxPasswordLength) {
        return true;
      } else {
        return (
          'Your password needs to be at least ' +
          maxPasswordLength +
          ' characters long.'
        );
      }
    },
  },
  {
    type: 'password',
    name: 'repeatPassword',
    message: 'Repeat password:',
    validate: function(value, answers) {
      if (value.length >= maxPasswordLength && value === answers.password) {
        return true;
      } else {
        return 'Passwords does not match.';
      }
    },
  },
  {
    type: 'input',
    name: 'displayName',
    message: 'Name:',
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your name.';
      }
    },
  },
];

console.log('Set up your first admin account');
inquirer
  .prompt(questions)
  .then(answers => {
    createAdmin(answers.email, answers.password, answers.displayName);
    return null;
  })
  .catch(function(err) {
    console.log(err);
    process.exit(0);
  });

/**
 * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
const validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const createAdmin = function(email, password, displayName) {
  const user = {
    email,
    password,
    displayName,
  };

  const uid = admin
    .auth()
    .createUser(user)
    .then(function(userRecord) {
      return userRecord.uid;
    });

  const setRolePromise = uid.then(function(uid) {
    return admin.auth().setCustomUserClaims(uid, { role: 'admin' });
  });

  const saveToDatabasePromise = uid.then(function(uid) {
    return teamRef.child(uid).set({ disabled: false });
  });

  Promise.all([setRolePromise, saveToDatabasePromise])
    .then(function() {
      console.log('User %s created!', email);
      process.exit(1);
      return null;
    })
    .catch(function(err) {
      console.log(err);
      process.exit(0);
    });
};
