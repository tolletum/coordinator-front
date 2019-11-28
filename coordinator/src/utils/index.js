import axios from 'axios'

const coordinatorsClient = axios.create({
    baseURL: 'http://localhost:8081/coordinators/',
    timeout: 1000,
    headers: {
        'content-type': 'application/json',
    },
})

export { coordinatorsClient }
