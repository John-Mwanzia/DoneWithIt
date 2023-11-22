import * as SecureStore from 'expo-secure-store';
// import jwtDecode from 'jwt-decode';

//replace jwtdecode with a regular helper function parseJWT

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync('token', authToken);
    } catch (error) {
        console.log('Error storing the auth token', error);
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync('token');
    } catch (error) {
        console.log('Error getting the auth token', error);
    }
}

const getUser = async () => {
    const token = await getToken();
    return token ? parseJwt(token) : null;
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('token');
    } catch (error) {
        console.log('Error removing the auth token', error);
    }
}


export default {
    getToken,
    getUser,
    removeToken,
    storeToken
}