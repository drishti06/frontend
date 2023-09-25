import axios from "axios";

export function fetchLoggedInUser() {
    return new Promise(async (resolve) => {
        const response = await axios.get('http://localhost:8080/users/own')
        const data = await response.data
        console.log(data)
        resolve({ data })
    }
    );
}

export function updateUser(update) {
    return new Promise(async (resolve) => {
        const response = await axios.patch('http://localhost:8080/users/' + update.id, update)
            .then(() => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        const data = await response.data
        resolve(data);
    });
}


