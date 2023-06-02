export const sendHttpRequest = async (url: string, method: string, headers: any, params: any) => {
    try {
        const requestOptions: any = {
            method: method.toUpperCase(),
            headers: headers,
        };
        if (method.toUpperCase() === 'POST') {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(params);
        } else if (method.toUpperCase() === 'GET') {
            const queryParams = new URLSearchParams(params).toString();
            url += `?${queryParams}`;
        }
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
