export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('redux-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('redux-state', serializedState);
    } catch (err) {
        console.log('save state error: ', err);
    }
};