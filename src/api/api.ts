import axios from 'axios'

const api = axios.create({
    baseURL: 'https://maplestory.io'
})

export default api
