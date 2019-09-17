import { userService } from '@/_services/user.service';
import config from 'config';
import { authHeader } from '../_helpers';

export const personService = {
    getByPhone
};

function getByPhone (phone) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/person/person?phone=${phone}`, requestOptions).then(handleResponse);
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