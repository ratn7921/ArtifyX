// import axios from "axios"
// const axiosClient=axios.create({
//     baseURL:'http://192.168.19.124:1337/api',
//     headers:{
//         'Authorization':'Bearer '+process.env.EXPO_PUBLIC_STRAPI_API_KEY
//     }
// })


// const GetUserInfo=(email)=>axiosClient.get('lists?filters[userEmail][$eql='+email)

// const CreateNewUser=(data)=>axiosClient.post('/lists',{data:data})
// export default{
//     GetUserInfo,
//     CreateNewUser
// }


import axios from 'axios';
import Constants from 'expo-constants';

const axiosClient = axios.create({
  baseURL: 'http://192.168.19.124:1337/api',
  headers: {
    'Authorization': `Bearer ${Constants.manifest.extra.strapiApiKey}`,
  },
});

const GetUserInfo = (email) => axiosClient.get(`/lists?filters[userEmail][$eq]=${email}`);
const CreateNewUser = (data) => axiosClient.post('/lists', { data });

export default {
  GetUserInfo,
  CreateNewUser,
};
