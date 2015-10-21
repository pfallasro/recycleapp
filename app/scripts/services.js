angular.module('starter.services', [])

  .factory('TopRecyclers', function () {
    var topRecyclers = [{
      id: 0,
      name: 'Ben Sparrow',
      score: '500',
      career: 'Software Engineering',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Pablo Fallas',
      score: '400',
      career: 'Software Engineering',
      face: 'https://scontent-ord1-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/10641292_758556717539401_6233236325161753716_n.jpg?oh=20ece72ac75a93a7814fb45800b28bd5&oe=569277EF'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      score: '300',
      career: 'Software Engineering',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      name: 'Perry Governor',
      score: '200',
      career: 'Software Engineering',
      face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      score: '100',
      career: 'Software Engineering',
      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
      all: function () {
        return topRecyclers;
      },
      remove: function (recycler) {
        topRecyclers.splice(topRecyclers.indexOf(recycler), 1);
      },
      get: function (recyclerId) {
        for (var i = 0; i < topRecyclers.length; i++) {
          if (topRecyclers[i].id === parseInt(recyclerId)) {
            return topRecyclers[i];
          }
        }
        return null;
      }
    };
  })

  .factory('$localstorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    };
  }])

  .factory('LoginService', function ($q, $localstorage) {
    return {
      loginUser: function (name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var storedPassword = $localstorage.get(name);

        if (storedPassword === pw) {
          deferred.resolve('Welcome ' + name + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      }
    };
  })

  .factory('RegisterService', function ($q, $localstorage) {
    return {
      registerUser: function (name, pw, confirmedPw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        if (pw === confirmedPw) {
          $localstorage.set(name, pw);
          deferred.resolve('Registered successful ' + name + '!');
        } else {
          deferred.reject('Password is not the same.');
        }
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      }
    };
  })
;
