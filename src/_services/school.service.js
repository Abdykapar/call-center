import { authHeader } from '@/_helpers';
import { userService } from '@/_services/user.service';
import config from 'config';

export const schoolService = {
    getById,
};


function getById (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/school/${id}`, requestOptions).then(handleResponse);
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