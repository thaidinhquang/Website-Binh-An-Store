const AUTH_KEY = 'user';

const getAuth = () => {
    const lsValue = localStorage?.getItem(AUTH_KEY);
    if (!lsValue) return;

    try {
        const auth = JSON.parse(lsValue);
        return auth || undefined;
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
};

const setAuth = (auth) => {
    try {
        const lsValue = JSON.stringify(auth);
        localStorage?.setItem(AUTH_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
};

const removeAuth = () => {
    try {
        localStorage?.removeItem('token');
        localStorage?.removeItem(AUTH_KEY);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
    }
};

export { getAuth, setAuth, removeAuth };