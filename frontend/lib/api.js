const defaultApiBaseUrl = 'http://localhost:3001';

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl;

const readResponse = async (response) => {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.error || 'Request failed.');
    }

    return data;
};

export const request = async (path = '', options = {}) => {
    const response = await fetch(`${apiBaseUrl}${path}`, options);
    return readResponse(response);
};

const requestWithJsonBody = async (method, path = '/', body = {}) =>
    request(path, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

export const getHealth = async () => request('/health');

export const getResource = async () => request('/');

export const postResource = async (body = {}) => requestWithJsonBody('POST', '/', body);

export const putResource = async (body = {}) => requestWithJsonBody('PUT', '/', body);

export const deleteResource = async (body = {}) => requestWithJsonBody('DELETE', '/', body);
