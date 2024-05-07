import axios from "axios"

export function createUser(userData) {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.post('import.meta.env.VITE_BASEURL/auth/signup', userData)
            if (response.status === 201) {
                const data = await response.data
                resolve({ data })
            }
        } catch (error) {
            console.log(error.message)
        }
    });
}

export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('import.meta.env.VITE_BASEURL/auth/login', loginInfo);
            if (response.status === 200) {
                const data = await response.data
                resolve({ data });
            } else {
                const error = await response.message;
                reject(error);
            }
        } catch (error) {
            reject(error);
        }
    });
}


export function signOut() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get('import.meta.env.VITE_BASEURL/auth/logout');
            if (response.ok) {
                resolve({ data: 'success' });
            } else {
                const error = await response.text;
                reject(error);
            }
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}
