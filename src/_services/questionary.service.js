import { authHeader } from '@/_helpers';
import { userService } from '@/_services/user.service';
import config from 'config';

export const questionaryService = {
    create,
    update,
    getById,
    getAll,
    getByCategory,
    getByNotReplied,
    getByPhone,
    getByFio,
    getList,
    delete: _delete
};

function create (data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/questionary/create`, requestOptions).then(handleResponse);
}

function getAll (page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/list?page=${page}&${size}`, requestOptions)
        .then(handleResponse);
}

function getList () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/list-without-pagination`, requestOptions)
        .then(handleResponse);
}

function getById (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/${id}`, requestOptions).then(handleResponse);
}

function getByCategory (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/get-by-category/${id}`, requestOptions).then(handleResponse);
}

function getByFio (name, surname, middle_name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/get-by-fio/${name}/${surname}/${middle_name}`, requestOptions).then(handleResponse);
}

function getByPhone (phone, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/get-by-phone/${phone}?page=${page}&size=${size}`, requestOptions).then(handleResponse);
}

function getByNotReplied () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questionary/not-replied`, requestOptions).then(handleResponse);
}

function update (data){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/questionary/edit/${data.id}`, requestOptions).then(handleResponse);
}

function _delete (id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/questionary?id=${id}`, requestOptions).then(handleResponse);
}

function handleResponse (response)
{
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok)
        {
            if (response.status === 401 || response.status === 403)
            {
                // eslint-disable-next-line no-undef
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}