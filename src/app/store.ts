import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import counterReducer from "../features/counter/counterSlice"
import { persistStore, persistReducer } from "redux-persist"

const persistConfig = {
  key: "newRootKey",
  storage,
}

const rootReducer = combineReducers({
  counter: counterReducer,
})

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
