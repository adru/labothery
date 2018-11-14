trueBlue.service('Override', ['$rootScope', 'DataService', '$localStorage', '$timeout', function($rootScope, DataService, $localStorage, $timeout) {
  this.init = function() {
    console.log("OVERRIDE INIT");
    $rootScope.finished = true;
    // $rootScope.APIpath = "http://localhost.trueblue.guru/api/v1.5/public";
    // console.log("$localStorage.TBapikey", $localStorage.TBapikey);
    if ($localStorage.TBapikey) {
      $rootScope.apiKey = $localStorage.TBapikey;
      // console.log("$rootScope.offline", $rootScope.offline);
      if (!$rootScope.offline) {
        $rootScope.overrideShowQR = true;
        $timeout(function() {
          $rootScope.popupForm('my_qr');
        });
      }
    }
  }
}]);

// load offline page template
trueBlue.directive('offlineQr', ['$rootScope', '$timeout', '$localStorage', function($rootScope, $timeout, $localStorage) {
  return {
    restrict: 'EA',
    templateUrl: 'Partials/offline.html',
    link: function(scope, element, attrs) {
      $rootScope.$watch(function() {
        return $rootScope.apiKey;
      }, function() {
        if ($rootScope.apiKey) {
          populateQR();
        }
      });

      if ($localStorage.TBapikey) {
        $rootScope.apiKey = $localStorage.TBapikey;
      }

      if ($rootScope.apiKey) {
        populateQR();
      }

      function populateQR() {
        $('.qr_code',element).empty().attr('title',$rootScope.apiKey).qrcode({
          width: 300,
          height: 300,
          text: $rootScope.apiKey
        });
      }
    }
  };
}]);
