import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { ToastMiddleware } from './middleware/ToastMiddleware';

import { CatApi } from './services/CatApi';
import { ImageActivitySlice } from './slices/ImageActivitySlice';

export const store = configureStore({
  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(devToolsEnhancer())
      : getDefaultEnhancers(),
  middleware: (getDefaultMiddleware) => {
    type DefaultMiddleware = ReturnType<typeof getDefaultMiddleware>;
    return getDefaultMiddleware()
      .prepend(ToastMiddleware.middleware)
      .concat(CatApi.middleware) as unknown as DefaultMiddleware;
  },
  reducer: {
    // RTK-Query reducers
    [CatApi.reducerPath]: CatApi.reducer,
    // RTK slices
    [ImageActivitySlice.name]: ImageActivitySlice.reducer,
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
