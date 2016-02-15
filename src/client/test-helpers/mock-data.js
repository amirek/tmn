/* jshint -W079 */
var mockData = (function () {
    return {
        getMockUsers: getMockUsers,
        getMockStates: getMockStates
    };

    function getMockStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    title: 'home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Home'
                    }
                }
            }
        ];
    }

    function getMockUsers() {
        return [
            {
                'Id': 1,
                'Name': 'Student 1',
                'IsTutor': false
            },
            {
                'Id': 2,
                'Name': 'Student 2',
                'IsTutor': false
            },
            {
                'Id': 3,
                'Name': 'Tutor 1',
                'IsTutor': true
            },
            {
                'Id': 4,
                'Name': 'Tutor 2',
                'IsTutor': true
            }
        ];
    }
})();
