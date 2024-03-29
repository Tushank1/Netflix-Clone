import axios from "axios"

// baseURL to make requests to the movie  database API.

const instance =  axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default instance;