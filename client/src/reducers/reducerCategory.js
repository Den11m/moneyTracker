const spent = (state = '', action) => {
    switch (action.type) {
        case 'Health':
            return 'Здоровье';
        case 'Food':
            return 'Еда';
        case 'Hygiena':
            return 'Гигиена';
        case 'Home':
            return 'Жилье';
        case 'Clothes':
            return 'Одежда';
        case 'Sport':
            return 'Спорт';
        case 'Resort':
            return 'Отдых';
        case 'Mobile':
            return 'Связь';
        case 'Transport':
            return 'Транспорт';
        case 'Animals':
            return 'Питомцы';
        case 'Gifts':
            return 'Подарки';
        case 'Other':
            return 'Другое';
        case 'All':
            return '';
        default:
            return state
    }
};

export default spent;