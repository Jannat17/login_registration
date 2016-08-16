(function () {
    'use strict';

    angular
        .module('registrationApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var info = this;

        info.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            info.dataLoading = true;
            AuthenticationService.Login(info.username, info.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(info.username, info.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    info.dataLoading = false;
                }
            });
        };
    }

})();
