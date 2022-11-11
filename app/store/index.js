import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import rootSaga from './sagas';
import { createReducer } from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(createReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export { store };
