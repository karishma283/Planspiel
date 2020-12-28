import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const initialState = {};

//const middleware = [thunk];
/* 
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === 'development' ?
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : false,
  )
);


const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  process.env.NODE_ENV !== 'production' &&
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
 */
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));


export default store;
