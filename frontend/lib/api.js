const defaultApiBaseUrl = 'http://localhost:3001';
const defaultMinimumSupportedApiVersion = 'v1';
const apiVersion = process.env.EXPO_PUBLIC_MIN_SUPPORTED_API_VERSION ?? defaultMinimumSupportedApiVersion;
const apiVersionBasePath = `/api/${apiVersion}`;

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl;
export const currentApiVersion = apiVersion;

let apiSupportCheckPromise;

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

const apiPath = (path = '') => `${apiVersionBasePath}${path}`;

const requestWithJsonBody = async (method, path = '/', body = {}) =>
    request(path, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

export const getHealth = async () => request('/health');

export const getApiCompatibility = async () => {
    const health = await getHealth();
    const latestSupportedApiVersion = health.latestSupportedApiVersion ?? null;

    return {
        errorMessage:
            latestSupportedApiVersion === currentApiVersion
                ? null
                : `Unsupported frontend API version ${currentApiVersion}. Upgrade the app to the backend's latest supported API version ${latestSupportedApiVersion ?? 'unknown'}.`,
        isSupported: latestSupportedApiVersion === currentApiVersion,
        latestSupportedApiVersion
    };
};

export const ensureApiSupport = async () => {
    if (!apiSupportCheckPromise) {
        apiSupportCheckPromise = getApiCompatibility();
    }

    return apiSupportCheckPromise;
};

const assertApiSupport = async () => {
    const compatibility = await ensureApiSupport();

    if (!compatibility.isSupported) {
        throw new Error(compatibility.errorMessage);
    }

    return compatibility;
};

export const getResource = async () => {
    await assertApiSupport();

    return request(apiPath('/resource'));
};

export const postResource = async (body = {}) => {
    await assertApiSupport();

    return requestWithJsonBody('POST', apiPath('/resource'), body);
};

export const putResource = async (body = {}) => {
    await assertApiSupport();

    return requestWithJsonBody('PUT', apiPath('/resource'), body);
};

export const deleteResource = async (body = {}) => {
    await assertApiSupport();

    return requestWithJsonBody('DELETE', apiPath('/resource'), body);
};
