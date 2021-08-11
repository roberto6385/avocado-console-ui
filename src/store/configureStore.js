import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';
import rootSaga from '../sagas';
import rootReducer from '../reducers';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default () => {
	let persistor = persistStore(store);
	return {store, persistor};
};
