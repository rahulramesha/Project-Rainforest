import axios from 'axios'
import cookies from 'js-cookie'

axios.interceptors.request.use(function (config) {
    const token = cookies.get('XSRF-TOKEN')

    if (token)
        config.headers['xsrf-token'] =  token

    return config;
});

export default axios

export const deleteCookies = () => {
    cookies.remove('XSRF-TOKEN')
    cookies.remove('session-id')
}