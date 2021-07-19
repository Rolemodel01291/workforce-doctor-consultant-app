import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import { createLogger } from "redux-logger";
import AsyncStorage from '@react-native-async-storage/async-storage';
import createReducer from './rootReducer';

const middlewares = [];

const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === "development",
});

/**
 * @param key persist root
 * @param storage storage to store store data
 * @param whitelist can persist auth store
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['auth']
};

middlewares.push(loggerMiddleware);

const persistedReducer = persistReducer(persistConfig, createReducer());

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(store.asyncReducers));
	return store;
};


export default store