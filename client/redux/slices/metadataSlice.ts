import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface BreadcrumbMeta {
  href?: string | number;
  label?: string;
}

export interface MetadataState {
  breadcrumbMeta: Record<string, BreadcrumbMeta>;
  title?: string;
}

const initialState: MetadataState = {
  breadcrumbMeta: {},
  title: undefined,
};

export const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    addBreadcrumbMeta: (
      state,
      action: PayloadAction<{
        key: string;
        meta: MetadataState["breadcrumbMeta"];
      }>
    ) => {
      state.breadcrumbMeta[action.payload.key] = action.payload.meta;
    },
    delBreadcrumbMeta: (state, action: PayloadAction<string>) => {
      delete state.breadcrumbMeta[action.payload];
    },
    setBreadcrumbMeta: (
      state,
      action: PayloadAction<MetadataState["breadcrumbMeta"]>
    ) => {
      state.breadcrumbMeta = action.payload;
    },
    setTitle: (state, action: PayloadAction<MetadataState["title"]>) => {
      state.title = action.payload;
    },
    clearMetadata: (state) => ({
      breadcrumbMeta: {},
      title: undefined,
    }),
  },
});

export const { setBreadcrumbMeta, clearMetadata, setTitle } =
  metadataSlice.actions;

export const selectMetadata = (state: AppState) => state.metadata;
export const selectBreadcrumbMeta = (state: AppState) =>
  state.metadata.breadcrumbMeta;
export const selectTitle = (state: AppState) => state.metadata.title;

export default metadataSlice.reducer;
