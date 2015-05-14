'use strict';

angular.module('videoPodcastApp')
  .controller('MainCtrl', function ($scope, $http,$sce,video) {
    $scope.podcasts = [];

    $http.get('/api/getPodcast').success(function(podcasts_json) {
      var podcasts = podcasts_json.rss.channel[0].item;
        $scope.podcast_title = podcasts_json.rss.channel[0].title[0];
        $scope.podcast_description = podcasts_json.rss.channel[0].description[0];
      $scope.podcasts = podcasts;
      $scope.podcast = $scope.podcasts[0];

      video.addSource($scope.podcast.enclosure[0].$.type, $scope.podcast.link[0]);
    });


    angular.element('list__item').focus();
    $scope.changeSource = function(myVideo) {
      video.addSource(myVideo.enclosure[0].$.type, myVideo.link[0], true);
    };
  });
