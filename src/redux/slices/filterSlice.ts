import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
	RATING_DESC = "rating",
	RATING_ASC = "-rating",
	PRICE_DESC = "price",
	PRICE_ASC = "-price",
	TITLE_DESC = "title",
	TITLE_ASC = "-title",
}

export type SortType = {
	name: string;
	sortProperty: SortPropertyEnum;
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
		sortProperty: SortPropertyEnum.RATING_DESC,
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
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage);
				state.sort = action.payload.sort;
				state.categoryId = Number(action.payload.categoryId);
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = {
					name: "популярности",
					sortProperty: SortPropertyEnum.RATING_DESC,
				};
			}
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
