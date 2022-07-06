import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortType = {
	name: string;
	sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title"; // только такие значения можно вписать теперь
};

export interface FilterSliceStateType {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortType;
}
// начальное состояние (state) нашего фильтра
const initialState: FilterSliceStateType = {
	searchValue: "",
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: "популярности",
		sortProperty: "rating",
	},
};

// В filterSlice - createSlice создаст slice где будет хранится логика обработки данных нашего state
const filterSlice = createSlice({
	// name нужен чтоб redux мог корректно задать определенную команду
	name: "filter",
	initialState,
	reducers: {
		// изменение категории
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		// изменение в поле поиска
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		// изменение сортировки
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},
		// изменение страницы
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		// отправляются в qs, чтоб сохранить страницу с её фильтрами (страницей,сортировкой и категорией)
		setFilters(state, action: PayloadAction<FilterSliceStateType>) {
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

// селектор экспортирует текущую сортировку
export const selectSort = (state: RootState) => state.filterSlice.sort;
// селектор экспортирует все данные из filterSlice
export const selectFilter = (state: RootState) => state.filterSlice;

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
