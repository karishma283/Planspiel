/* Hostname to send API Requests according to app environment */
export const hostname = () => {
    var hostname;
    if (process.env.NODE_ENV === 'development') {
        hostname = 'http://localhost:5000/api/'
    }

    if (process.env.NODE_ENV === 'production') {
        hostname = 'https://www.garagen-guru.de/api/'
    }
    return hostname;
}