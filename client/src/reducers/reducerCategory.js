const spent = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_CATEGORY':
            return action.category;
        default:
            return state
    }
};

export default spent;