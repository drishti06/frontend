import axios from "axios";

export function fetchLoggedInUser() {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.get('import.meta.env.VITE_BASEURL/users/own')
            const data = await response.data
            console.log(data)
            resolve({ data })

        } catch (error) {
            console.log(error)
        }

    }
    );
}

export function updateUser(update) {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.patch('import.meta.env.VITE_BASEURL/users/' + update.id, update)
            const data = await response.data
            resolve(data);
        } catch (error) {
            console.log(error)
        }

    });
}


