'use client'

import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import cartReducer from './cartSlice'

// Create no-op storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve()
    },
    removeItem(_key: string) {
      return Promise.resolve()
    }
  }
}

// Create storage with SSR check
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

// Cart persistence config - use localStorage
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items']
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
