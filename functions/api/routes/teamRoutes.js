'use strict';

module.exports = function(router) {
  var team = require('../controllers/teamController');

  // posts Routes
  router
    .route('/team')
    .get(team.getTeam)
    .post(team.createTeamMember);

  router.route('/team/active').get(team.getActiveTeam);

  router.route('/team/disabled').get(team.getDisabledTeam);

  router
    .route('/team/:userId')
    .get(team.getTeamMember)
    .put(team.updateTeamMember)
    .delete(team.deleteTeamMember);
};
