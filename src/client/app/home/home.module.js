(function () {
    'use strict';

    angular.module('app.home', [
        'app.core',
        'ngAnimate',
        'mwl.calendar',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker'
    ]).constant('uiDatetimePickerConfig', {
        dateFormat: 'dd MMM yyyy HH:mm',
        defaultTime: '12:00:00',
        html5Types: {
            date: 'dd MMM yyyy',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'MMM yyyy'
        },
        enableDate: true,
        enableTime: true,
        buttonBar: {
            show: true,
            now: {
                show: true,
                text: 'Now'
            },
            today: {
                show: true,
                text: 'Today'
            },
            clear: {
                show: false,
                text: 'Clear'
            },
            date: {
                show: true,
                text: 'Date'
            },
            time: {
                show: true,
                text: 'Time'
            },
            close: {
                show: true,
                text: 'Close'
            }
        },
        closeOnDateSelection: true,
        appendToBody: false,
        altInputFormats: [],
        ngModelOptions: {}
    });
})();
