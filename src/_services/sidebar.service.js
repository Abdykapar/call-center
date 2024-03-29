import config from 'config';
import { authHeader } from '../_helpers';

export const sidebarService = {
    getAll,
    getById,
    getByRole,
    create,
    update,
    delete: _delete
};


function create(sidebar) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sidebar)
    };

    return fetch(`${config.apiUrl}/security/sidebar/create`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/security/sidebar`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/security/sidebar/${id}`, requestOptions).then(handleResponse);
}

function getByRole(role_code) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/security/sidebar?role=${role_code}`, requestOptions).then(handleResponse);
}

function update(sidebar) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(sidebar)
    };

    return fetch(`${config.apiUrl}/security/sidebar/edit/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/security/sidebar/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 || response.status === 403 ) {
                // auto logout if 401 response returned from api
                localStorage.removeItem("user");
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);    
        return data;
    });
}