import { addListener, createListenerMiddleware } from '@reduxjs/toolkit';
import { CatApi } from '../services/CatApi';
import { AppDispatch, RootState } from '../store';
import { showToast } from '../thunks/showToast';

export const ToastMiddleware = createListenerMiddleware();

export const startAppListening = ToastMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

const TITLE_SUCCESS = 'Success';
const TITLE_ERROR = 'Error';

startAppListening({
  matcher: CatApi.endpoints.uploadImage.matchFulfilled,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `🩻 ${TITLE_SUCCESS}`,
        message: 'Image uploaded successfully',
      }),
    );
  },
});

startAppListening({
  matcher: CatApi.endpoints.uploadImage.matchRejected,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `🩻 ${TITLE_ERROR}`,
        message: [
          'There was an error while uploading your image',
          action.error.message,
        ].join('\n'),
      }),
    );
  },
});

startAppListening({
  matcher: CatApi.endpoints.deleteImage.matchFulfilled,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `🩻 ${TITLE_SUCCESS}`,
        message: 'Image deleted successfully',
      }),
    );
  },
});

startAppListening({
  matcher: CatApi.endpoints.deleteImage.matchRejected,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `🩻 ${TITLE_ERROR}`,
        message: [
          'There was an error while deleting your image',
          action.error.message,
        ].join('\n'),
      }),
    );
  },
});

// startAppListening({
//   matcher: CatApi.endpoints.upvoteImage.matchFulfilled,
//   effect: async (action, { dispatch }) => {
//     await dispatch(
//       showToast({
//         title: `🔼 ${TITLE_SUCCESS}`,
//         message: 'Your upvote was successful',
//       })
//     );
//   },
// });

startAppListening({
  matcher: CatApi.endpoints.upvoteImage.matchRejected,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `🔼 ${TITLE_ERROR}`,
        message: [
          'There was an error while sending your upvote',
          action.error.message,
        ].join('\n'),
      }),
    );
  },
});

// startAppListening({
//   matcher: CatApi.endpoints.downvoteImage.matchFulfilled,
//   effect: async (action, { dispatch }) => {
//     await dispatch(
//       showToast({
//         title: `🔽 ${TITLE_SUCCESS}`,
//         message: 'Your downvote was successful',
//       })
//     );
//   },
// });

startAppListening({
  matcher: CatApi.endpoints.downvoteImage.matchRejected,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `🔼 ${TITLE_ERROR}`,
        message: [
          'There was an error while sending your downvote',
          action.error.message,
        ].join('\n'),
      }),
    );
  },
});

// startAppListening({
//   matcher: CatApi.endpoints.favouriteImage.matchFulfilled,
//   effect: async (action, { dispatch }) => {
//     await dispatch(
//       showToast({
//         title: `❤️ ${TITLE_SUCCESS}`,
//         message: 'Favourited the kitty successfully',
//       })
//     );
//   },
// });

startAppListening({
  matcher: CatApi.endpoints.favouriteImage.matchRejected,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `❤️ ${TITLE_ERROR}`,
        message: [
          'There was an error while favouriting the image',
          action.error.message,
        ].join('\n'),
      }),
    );
  },
});

// startAppListening({
//   matcher: CatApi.endpoints.unfavouriteImage.matchFulfilled,
//   effect: async (action, { dispatch }) => {
//     await dispatch(
//       showToast({
//         title: `💔 ${TITLE_SUCCESS}`,
//         message: 'Image unfavourited successfully',
//       })
//     );
//   },
// });

startAppListening({
  matcher: CatApi.endpoints.unfavouriteImage.matchRejected,
  effect: async (action, { dispatch }) => {
    await dispatch(
      showToast({
        title: `❤️ ${TITLE_ERROR}`,
        message: [
          'There was an error while unfavouriting the image',
          action.error.message,
        ].join('\n'),
      }),
    );
  },
});
