const spent = (state = '', action) => {
    switch (action.type) {
        case 'Health':
            return 'Health';
        case 'Food':
            return 'Food';
        case 'Hygiena':
            return 'Hygiena';
        case 'Home':
            return 'Home';
        case 'Clothes':
            return 'Clothes';
        case 'Sport':
            return 'Sport';
        case 'Resort':
            return 'Resort';
        case 'Mobile':
            return 'Mobile';
        case 'Transport':
            return 'Transport';
        case 'Animals':
            return 'Animals';
        case 'Gifts':
            return 'Gifts';
        default:
            return ''
    }
};

export default spent;