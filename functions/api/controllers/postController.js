'use strict';
const admin = require('firebase-admin');

const rootRef = admin.database().ref();
const postsRef = admin.database().ref('/posts');
const contentsRef = admin.database().ref('/postContents');

function isUndefined(object) {
  return typeof object === 'undefined';
}

exports.getPosts = function(req, res) {
  postsRef
    .once('value')
    .then(function(snap) {
      return res.json(snap.val());
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.createPost = function(req, res) {
  const postId = postsRef.push().key;

  const {
    title = null,
    subtitle = null,
    content = null,
    status = null,
    category = null,
    author = null,
    publishTime = null,
  } = req.body;

  if (content) {
    const updates = {};

    const contentStr = JSON.stringify(content);
    contentsRef.child(postId).set(contentStr);

    updates['/postContents/' + postId] = contentStr;
    updates['/posts/' + postId] = {
      title,
      subtitle,
      status,
      category,
      author,
      publishTime,
    };

    rootRef
      .update(updates)
      .then(function() {
        return res.json({ message: 'Post created!' });
      })
      .catch(function(err) {
        res.send(err);
      });
  } else {
    res.send(new Error('Missing content!'));
  }
};

exports.getPost = function(req, res) {
  postsRef
    .child(req.params.postId)
    .once('value')
    .then(function(snap) {
      return res.json(snap.val());
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.updatePost = function(req, res) {
  const postId = req.params.postId;

  const { content = null, ...postUpdates } = req.body;

  const updates = {};

  for (let key in postUpdates) {
    const value = postUpdates[key];
    updates['/posts/' + postId + '/' + key] = value;
  }

  if (content) {
    const contentStr = JSON.stringify(content);
    updates['/postContents/' + postId] = contentStr;
  }

  rootRef
    .update(updates)
    .then(function() {
      return res.json({ message: 'Post updated!' });
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.deletePost = function(req, res) {
  const postId = req.params.postId;

  const updates = {};
  updates['/posts/' + postId] = null;
  updates['/postContents/' + postId] = null;

  rootRef
    .update(updates)
    .then(function() {
      return res.json({ message: 'Post deleted!' });
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getPostContent = function(req, res) {
  contentsRef
    .child(req.params.postId)
    .once('value')
    .then(function(snap) {
      return res.json(JSON.parse(snap.val()));
    })
    .catch(function(err) {
      res.send(err);
    });
};
