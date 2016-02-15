(function () {
    'use strict';

    angular.module('app', [
            'app.core',
            'app.home',
            'app.layout'
        ])
        .value('baseUrl', 'https://teachmenowdevtest.azurewebsites.net');

})();
