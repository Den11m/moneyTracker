export const loginHeader = () => {
    return {
        type: 'LOGIN',
        login: true,
    }
};

export const logOut = () => {
    return {
        type: 'LOGOUT',
        login: false,
    }
};