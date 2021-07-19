import { post } from './base.js';

export const UserAPI = {
    createAccount: (data) =>
        post(`/createUser`, { ...data })
            .then(({ data }) => data)
            .catch(({ error }) => error),
};
