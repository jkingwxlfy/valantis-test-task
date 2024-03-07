import { md5 } from 'js-md5';

export const useHttp = () => {
    const _password = 'Valantis';

    const getTimeStamp = () => {
        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getUTCDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const request = async (url: string, body: any, method = 'POST') => {
        const authString = md5(`${_password}_${getTimeStamp()}`);
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth': authString,
        };

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                );
            }

            const data = await response.json();

            return data;
        } catch (e) {
            throw e;
        }
    };

    return { request };
};
