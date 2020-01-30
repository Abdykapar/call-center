import config from 'config';
import {authHeader} from '@/_helpers/index';
import {userService} from '@/_services/user.service';

export default {
    getAll() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`${config.apiUrl}/parent-student`, requestOptions).then(handleResponse);
    },

    getAllByStudent(studentId) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`${config.apiUrl}/parent-student/get-by-student/${studentId}`, requestOptions).then(handleResponse);
    },

    getById(id) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`${config.apiUrl}/parent-student/${id}`, requestOptions).then(handleResponse);
    },

    getByClass(class_id)
    {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`${config.apiUrl}/parent-student/get-by-class/${class_id}`, requestOptions).then(handleResponse);
    },

    getExportAllBySchool(schoolId) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`${config.apiUrl}/parent-student/get-export-all-by-school/${schoolId}`, requestOptions).then(handleResponse);
    },

    getByPerson(person_id)
    {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`${config.apiUrl}/parent-student/get-by-person/${person_id}`, requestOptions).then(handleResponse);
    },

    create(parent) {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(parent)
        };

        return fetch(`${config.apiUrl}/parent-student/create`, requestOptions).then(handleResponse);
    },

    update(parent) {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(parent)
        };

        return fetch(`${config.apiUrl}/parent-student/edit/${parent.id}`, requestOptions).then(handleResponse);
    },

    substituteParent(parent) {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(parent)
        };

        return fetch(`${config.apiUrl}/parent-student/substitute-parent`, requestOptions).then(handleResponse);
    },

    substituteStudent(student) {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };

        return fetch(`${config.apiUrl}/parent-student/substitute-student`, requestOptions).then(handleResponse);
    },

    getChildrenList(parent) {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(parent)
        };

        return fetch(`${config.apiUrl}/parent-student/get-children-list`, requestOptions).then(handleResponse);
    },

    _delete(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return fetch(`${config.apiUrl}/parent-student/${id}`, requestOptions).then(handleResponse);
    },
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};