import axios from 'axios';
 
const api = axios.create({

  baseURL: "https://dev.riai.cloud/dev-api",

  headers: {

    'Content-Type': 'application/json',

    'Accept': 'application/json',

  },

});
 
 
// api.interceptors.request.use(

//   (config) => {

//     const token = sessionStorage.getItem('auth'); 

//     if (token) {

//       config.headers.Authorization = `Bearer ${token}`;

//     } else {

//       sessionStorage.removeItem('auth');

//     //  window.location.replace('/auth');

//     }

//     return config;

//   },

//   (error) => {

//     return Promise.reject(error);

//   }

// );

// let isRefreshing = false;
 
// const refreshAuthToken = async () => {

//   try {

//     const accessToken = sessionStorage.getItem('auth');

//     const response = await api.post(

//       '/v1/auth/refresh-token',

//       { "access_token": accessToken },

//       { headers: { 'Content-Type': 'application/json' } }

//     );
 
//     if (response && response.status === 200) {

//       sessionStorage.setItem('auth', response.refresh_token);

//       return response.refresh_token;

//     } else {

//      //localStorage.removeItem('auth');

//       window.location.replace('/');

//       throw new Error('Failed to refresh token');

//     }

//   } catch (error) {

//     //localStorage.removeItem('auth');

//     window.location.replace('/');

//     console.error("Failed to refresh token:", error);

//     throw error;

//   }

// };
 
// api.interceptors.response.use(

//   (response) => {

//     return response.data;

//   },

//   async (error) => {

//     const originalRequest = error.config;
 
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {

//       originalRequest._retry = true;
 
//       if (!isRefreshing) {

//         isRefreshing = true;
 
//         try {

//           const newToken = await refreshAuthToken();

//           if (newToken) {

//             originalRequest.headers.Authorization = `Bearer ${newToken}`;

//             isRefreshing = false;
 
//             return api(originalRequest);

//           }

//         } catch (refreshError) {

//           isRefreshing = false;

//           return Promise.reject(refreshError);

//         }

//       } else {

//        // localStorage.removeItem('auth');

//         return Promise.reject(error);

//       }

//     }
 
//     if (!originalRequest._retry) {

//       //localStorage.removeItem('auth');

//     }
 
//     return Promise.reject(error);

//   }

// );
 
export default api;

 