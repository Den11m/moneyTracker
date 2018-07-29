export const loginHeader = () => ({
        type: 'LOGIN',
        login: true,
    });

export const logOut = () => ({
        type: 'LOGOUT',
        login: false,
    });