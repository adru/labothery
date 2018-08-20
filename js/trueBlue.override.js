trueBlue.service('Override', ['$rootScope', 'DataService', '$localStorage', '$timeout', function($rootScope, DataService, $localStorage, $timeout) {
  this.init = function() {
    console.log("OVERRIDE INIT");
    $rootScope.finished = true;
    $rootScope.APIpath = "http://localhost.trueblue.guru/api/v1.5/public";
    // $rootScope.APIpath = "http://live.trueblue.guru/application/v1.5/public";
    console.log("$localStorage.TBapikey", $localStorage.TBapikey);
    if ($localStorage.TBapikey) {
      $rootScope.apiKey = $localStorage.TBapikey;
      if (!$rootScope.offline) {
        $rootScope.overrideShowQR = true;
        $timeout(function() {
          $rootScope.popupForm('my_qr');
        });
      }
    }
  }
}]);

trueBlue.directive('appLink', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (typeof device !== "undefined") {
        console.log("device", device.platform);
        if (typeof device !== "undefined") {
          if (device.platform === "iOS") {
            element.attr("link", "itms://itunes.apple.com/us/app/wechat/id414478124?mt=8");
          } else if(device.platform === 'Android') {
            element.attr("link", "market://details?id=com.tencent.mm");
          }
        }
      }
      return false;
    }
  };
});

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
