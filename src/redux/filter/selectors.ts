import { RootState } from "../store";

// селектор экспортирует текущую сортировку
export const selectSort = (state: RootState) => state.filterSlice.sort;
// селектор экспортирует все данные из filterSlice
export const selectFilter = (state: RootState) => state.filterSlice;
