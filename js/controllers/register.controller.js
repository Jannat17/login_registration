(function () {
    'use strict';

    angular
        .module('registrationApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var info = this;

        info.register = register;

        function register() {
            info.dataLoading = true;
            UserService.Create(info.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        info.dataLoading = false;
                    }
                });
        }
    }

})();
