import {
  combineReducers,
  configureStore,
  type PreloadedState,
} from "@reduxjs/toolkit";

import campaignsReducer from "./features/campaigns/campaignsSlice";
import overviewReducer from "./features/overview/overviewSlice";

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  overview: overviewReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
