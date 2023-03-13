import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import createSagaMiddleware from '@redux-saga/core';
import { rootReducer } from './redux/reducers/root-reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootSaga from './redux/sagas/index';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

