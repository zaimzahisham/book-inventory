import axios from "axios"
import universalCookie from "universal-cookie"

axios.defaults.withCredentials = true
const cookie = new universalCookie('/');


export function setJwtCookie(token) {
    cookie.set("access_token", token.access, {
        httpOnly: false,
        secure: false,
        path: '/' 
    });
    cookie.set("refresh_token", token.refresh, {
        httpOnly: false,
        secure: false,
        path: '/' 
    });
}

export function clearJwtCookie() {
    try {
        cookie.remove("access_token", { path: '/' });
        cookie.remove("refresh_token", { path: '/' });
        cookie.remove("is_author", { path: '/' });
    }catch(error) {
        console.error(error);
    }
    
}

export function getAccessToken() {
    return cookie.get("access_token", { path: '/' });
}

export function getRefreshToken() {
    return cookie.get("refresh_token", { path: '/' });
}

export function getIsAuthor() {
    return cookie.get("is_author", { path: '/' });
}

export function setAccessToken(token) {
    cookie.set("access_token", token, {
        httpOnly: false,
        secure: true,
    });
}

export const noCredentialsAxiosInstance = axios.create({
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});

export const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,
    },
});

// refresh token if request error status 401
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios
                .post(config.server_url + '/user/token/refresh/', {
                    refresh: getRefreshToken(),
                })
                .then(res => {
                    setAccessToken(res.data.access);
                    setJwtCookie(res.data);
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                    return axios(originalRequest);
                })
                .catch(err => {
                    clearJwtCookie();
                });
        }
    }
)