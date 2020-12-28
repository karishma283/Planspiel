// Written by Taleh Muzaffarov and Rajat Ghosh
// 
import {
    TEST, NEWS, USER_CATEGORIES, ALL_CATEGORIES, ARTICLE,
    TOP_PODCASTS, CHANNELS, QUIZ_ARTICLES, QUIZES, USER_SCORE, GAINED_SCORE
} from './type'
import axios from 'axios'
import lscache from 'lscache'
import { hostname } from './hostname'
const config = {
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + lscache.get('usertoken'),
    },
}
export const login = user => dispatch => {
    /* fetch('http://192.168.0.106:5000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: user })
    }) */

    axios.post('http://192.168.0.106:5000/api/user/login', user, config)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                lscache.set('usertoken', response.data.token, 30000)
            }
        }).catch(function (error) {
            console.log(error);
        })
        .finally(function () {

            // always executed
        });

}

export const register = user => dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    }
    axios.post('http://192.168.0.106:5000/api/user/register', user, config)
        .then(response => {
            if (response.status === 200) {
                lscache.set('usertoken', response.data.token, 30000)

            }

        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

            // always executed
        });
}
export const fetchUserScore = () => dispatch => {
    fetch('http://192.168.0.106:5000/api/user/score', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken')
        }
    }).then(response => response.json()).then(response => {
        var data = response.data;
        console.log(data);
        dispatch({
            type: USER_SCORE,
            payload: data,
        })

    })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}
/* export const fetchCategoryNews = id => dispatch => {
    fetch('http://192.168.0.106:5000/api/news/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken')
        },
        body: JSON.stringify({ data: id })
    }).then(response => response.json()).then(response => {
        var data = response.data;
        if (data.length == 0) {
            dispatch({
                type: CATEGORY_NEWS,
                payload: [],
            })
        } else {
            dispatch({
                type: CATEGORY_NEWS,
                payload: data,
            })
        }
    })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
} */
export const fetchUserCategories = user => dispatch => {
    fetch('http://192.168.0.106:5000/api/categories/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken')
        },
        body: JSON.stringify({ data: user })
    }).then(response => response.json()).then(response => {
        var data = response.data;
        if (data.length == 0) {
            dispatch({
                type: USER_CATEGORIES,
                payload: [],
            })
        } else {
            dispatch({
                type: USER_CATEGORIES,
                payload: data,
            })
        }
    })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

}
export const fetchAllCategories = () => dispatch => {

    axios.get('http://192.168.0.106:5000/api/categories/all', config)
        .then(response => {
            var data = response.data;
            dispatch({
                type: ALL_CATEGORIES,
                payload: data,
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const fetchNews = id => dispatch => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + lscache.get('usertoken'),
        },
    }
    axios.post('http://192.168.0.106:5000/api/news/fetch/' + id, config)
        .then(response => {
            var infos = response.data;
            dispatch({
                type: NEWS,
                payload: infos,
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const fetchPodcasts = () => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken'),
        },
    }
    axios.post('http://192.168.0.106:5000/api/podcast/top', config)
        .then(response => {
            var data = response.data;
            console.log(data);

            dispatch({
                type: TOP_PODCASTS,
                payload: data,
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const finishQuiz = (data) => dispatch => {
    fetch('http://192.168.0.106:5000/api/quizes/check_answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken')
        },
        body: JSON.stringify({ data: data })
    }).then(response => response.json())
        .then(score =>
            dispatch({
                type: GAINED_SCORE,
                payload: score.data,
            })
        )
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const fetchQuiz = (id) => dispatch => {

    fetch('http://192.168.0.106:5000/api/quizes/fetch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken')
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.json())
        .then(quizes =>
            dispatch({
                type: QUIZES,
                payload: quizes,
            })
        )
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const fetchQuizList = () => dispatch => {
    fetch('http://192.168.0.106:5000/api/quizes/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + lscache.get('usertoken')
        }
    }).then(response => response.json())
        .then(articles =>
            dispatch({
                type: QUIZ_ARTICLES,
                payload: articles,
            })
        )
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    /* axios.post('http://192.168.0.106:5000/api/quizes/', headers)
        .then(response => {
            var data = response.data;
            dispatch({
                type: ARTICLE,
                payload: data,
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        }); */
}
export const fetchChannels = (id) => dispatch => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + lscache.get('usertoken'),
        },
    }
    axios.post('http://192.168.0.106:5000/api/channels/' + id, config)
        .then(response => {
            var data = response.data;
            dispatch({
                type: CHANNELS,
                payload: data,
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const fetchArticle = url => dispatch => {
    const config = {
        headers: {
            'content-type': 'application/json;',
        },
    }
    axios.post('http://192.168.0.106:5000/api/article/' + url, config)
        .then(response => {
            var data = response.data;
            dispatch({
                type: ARTICLE,
                payload: data,
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export const addCategory = data => dispatch => {
    axios.post('http://192.168.0.106:5000/api/categories/add', data, config)

        .then(response => {
            var res = response.data;
            console.log(res);

            dispatch({
                type: USER_CATEGORIES,
                payload: res,
            })

        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
}
