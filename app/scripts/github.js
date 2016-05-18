angular.module('github', [])
  .factory('GithubService', GithubService)
  .controller('GithubCtrl', GithubCtrl)
  .directive('github', Github);

function Github() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/templates/github.html',
    controller: 'GithubCtrl',
    controllerAs: 'github'
  };
}

function GithubService($http) {
  var base_url = "http://api.github.com";

  function getUser(name) {
    var user_url = base_url + '/users/' + name;
    return $http.get(user_url);
  }

  function getRepos(url) {
    return $http.get(url);
  }

  return {
    user: getUser,
    repos: getRepos
  };
}

GithubService.$inject = ['$http'];

function GithubCtrl(GithubService) {
  var vm = this;

  vm.what = '';
  vm.user = null;
  vm.repos = null;
  vm.userRequest = false;
  vm.repoRequest = false;
  vm.getUserData = getUserData;
  vm.getUserRepos = getUserRepos;

  function getUserData() {
    vm.userRequest = true;
    GithubService.user(vm.what).then(function(res) {
      vm.user = res.data;
      vm.userRequest = false;
    });
  }

  function getUserRepos() {
    vm.repoRequest = true;
    GithubService.repos(vm.user.repos_url).then(function(res) {
      vm.repos = res.data;
      vm.repoRequest = false;
    });
  }
}

GithubCtrl.$inject = ['GithubService'];
