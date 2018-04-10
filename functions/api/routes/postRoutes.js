'use strict';

module.exports = function(router) {
  var posts = require('../controllers/postController');

  // posts Routes
  router
    .route('/posts')
    .get(posts.getPosts)
    .post(posts.createPost);

  router
    .route('/posts/:postId')
    .get(posts.getPost)
    .put(posts.updatePost)
    .delete(posts.deletePost);

  router.route('/posts/contents/:postId').get(posts.getPostContent);
};
