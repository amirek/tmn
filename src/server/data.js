module.exports = {
    users: getUsers(),
    classes: getClasses()
};

function getUsers() {
    return [
        {
            'Id': 1,
            'Name': 'LStudent 1',
            'IsTutor': false
        },
        {
            'Id': 2,
            'Name': 'LStudent 2',
            'IsTutor': false
        },
        {
            'Id': 3,
            'Name': 'LTutor 1',
            'IsTutor': true
        },
        {
            'Id': 4,
            'Name': 'LTutor 2',
            'IsTutor': true
        }
    ];
}

function getClasses() {
    return [
        {
            'Id': 1,
            'Subject': 'LSubject 1',
            'StartTime': '2016-02-12T10:34:01.1222374+00:00',
            'EndTime': '2016-02-12T10:34:01.1222374+00:00',
            'Student': 2,
            'Tutor': 3
        },
        {
            'Id': 2,
            'Subject': 'LSubject 2',
            'StartTime': '2016-02-12T13:34:01.1222374+00:00',
            'EndTime': '2016-02-12T14:34:01.1222374+00:00',
            'Student': 1,
            'Tutor': 4
        },
        {
            'Id': 3,
            'Subject': 'LSubject 3',
            'StartTime': '2016-02-13T17:34:01.1222374+00:00',
            'EndTime': '2016-02-13T18:34:01.1222374+00:00',
            'Student': 1,
            'Tutor': 4
        },
        {
            'Id': 4,
            'Subject': 'Subject 4',
            'StartTime': '2016-02-15T11:34:01.1222374+00:00',
            'EndTime': '2016-02-15T12:34:01.1222374+00:00',
            'Student': 1,
            'Tutor': 4
        },
        {
            'Id': 5,
            'Subject': 'LSubject 5',
            'StartTime': '2016-02-14T08:34:01.1222374+00:00',
            'EndTime': '2016-02-14T11:34:01.1222374+00:00',
            'Student': 1,
            'Tutor': 4
        },
        {
            'Id': 6,
            'Subject': 'LSubject 6',
            'StartTime': '2016-02-12T13:34:01.1222374+00:00',
            'EndTime': '2016-02-12T16:34:01.1222374+00:00',
            'Student': 2,
            'Tutor': 4
        },
        {
            'Id': 7,
            'Subject': 'LSubject 7',
            'StartTime': '2016-02-12T19:34:01.1222374+00:00',
            'EndTime': '2016-02-12T20:34:01.1222374+00:00',
            'Student': 1,
            'Tutor': 3
        }
    ];
}
