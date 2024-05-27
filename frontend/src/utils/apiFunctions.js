import axios from "axios"

// back-end url
export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getDomains = async () => {
    // let sources = []
    // api.get('/api/domains')
    //     .then(response => {
    //         if (response.data.length > 0) {
    //             sources = response.data
    //         }
    //         return sources
    //     })
    //     .catch(error => console.error('Error fetching sources:', error));

    try {
        const response = await api.get('/api/domains')
        return response.data
    } catch (err) {
        throw new Error("Error fetching domains")
    }
}

export const searchStory = async (domain, query) => {
    try {
        const response = await api.get(`api/stories?source=${domain}&q=${query}`)
        return response.data
    } catch (err) {
        throw new Error("Error searching stories with query")
    }
}

export const getStoryByName = async (name) => {
    try {
        const result = await api.get(`/api/stories/${name}`)
        return result.data
    } catch (err) {
        throw new Error("Cannot find the story with name ", name)
    }
}