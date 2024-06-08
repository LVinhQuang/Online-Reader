import axios from "axios"

// back-end url
export const api = axios.create({
    baseURL: "http://localhost:3000"
})

const handleApiError = (err) => {
    console.error('API error:', err);
    return { success: false, message: err.message };
};


export const getDomains = async () => {
    try {
        const response = await api.get('/getdomains')
        return { success: true, data: response.data.data }
    } catch (err) {
        return handleApiError(err)
        // throw new Error("Error fetching domains")
    }
}

export const searchStory = async (domain, query) => {
    try {
        const searchPath = `/${domain}/search?keyword=${query}`
        // console.log("search path", searchPath)
        const response = await api.get(searchPath)
        console.log("search result in api functions", response.data)
        return { success: true, data: response.data.data }
    } catch (err) {
        return handleApiError(err)
        // throw new Error("Error searching stories with query")
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

export const getFeaturedStories = async (domain) => {
    try {
        if (!domain) {
            domain = 'tangthuvien'
        }
        const response = await api.get(`/${domain}`)
        console.log("featured stories", response.data)
        return { success: true, data: response.data.data }
    } catch (err) {
    handleApiError(err)
}
}