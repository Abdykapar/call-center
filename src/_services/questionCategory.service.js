import { authHeader } from '@/_helpers';
import { userService } from '@/_services/user.service';
import config from 'config';

export const questionCategoryService = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
};

function create (data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/question-category/create`, requestOptions).then(handleResponse);
}

function getAll () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/question-category`, requestOptions)
        .then(handleResponse);
}

function getById (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/question-category/${id}`, requestOptions).then(handleResponse);
}

function update (data){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/question-category/edit/${data.id}`, requestOptions).then(handleResponse);
}

function _delete (id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/question-category?id=${id}`, requestOptions).then(handleResponse);
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