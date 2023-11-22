import  Constants  from "expo-constants"

const settings = {
    dev : {
        apiUrl : "https://donewithit-4ok8.onrender.com/api"
    },
    staging : {
        apiUrl : "https://donewithit-4ok8.onrender.com/api"
    },
    prod : {
        apiUrl : "https://donewithit-4ok8.onrender.com/api"
    }
}


const  getCurrentSettings = () => {
    if(__DEV__) return settings.dev;
    if(Constants.manifest2?.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}


export default getCurrentSettings();