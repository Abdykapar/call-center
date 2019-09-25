import config from 'config';
import { authHeader } from '../../_helpers';
import { userService } from '../../_services';

export const locationService = {
    getRegions,
    getRayonByRegion
};

function getRegions () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/location/region`, requestOptions).then(handleResponse);
}

function getRayonByRegion (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/location/rayon/get?region_id=${id}`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
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
}