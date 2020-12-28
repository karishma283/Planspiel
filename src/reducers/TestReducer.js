//Taleh Muzaffarov and Rajat Ghosh

import {
    TEST, NEWS, USER_CATEGORIES, ARTICLE, ALL_CATEGORIES,
    TOP_PODCASTS, CHANNELS, QUIZ_ARTICLES, QUIZES, GAINED_SCORE, USER_SCORE
} from '../actions/type.js'

import merge from 'lodash/merge';
const initialState = {
    test: {},
    news: {},
    userCategories: [],
    allCategories: {},
    article: {},
    top_podcasts: {},
    channels: {},
    quiz_articles: [],
    quizes: [],
    quizResult: null,
    user_score: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case NEWS:
            return {
                ...state,
                news: action.payload
            };
        case USER_CATEGORIES:
            return {
                ...state,
                userCategories: action.payload
            };
        case ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            };
        case GAINED_SCORE:
            return {
                ...state,
                quizResult: action.payload
            }
        case USER_SCORE:
            return {
                ...state,
                user_score: action.payload
            }
        case QUIZES:
            return {
                ...state,
                quizes: action.payload
            };
        case ARTICLE:
            return {
                ...state,
                article: action.payload
            }
        case TOP_PODCASTS: {
            return {
                ...state,
                top_podcasts: action.payload
            }
        }
        case QUIZ_ARTICLES: {
            return {
                ...state,
                quiz_articles: action.payload
            }
        }
        case CHANNELS: {
            return {
                ...state,
                channels: action.payload
            }
        }
        default:
            return state
    }
}