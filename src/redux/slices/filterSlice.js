import { createSlice } from "@reduxjs/toolkit";

// начальное состояние нашего state
const initialState = {
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
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},

		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	},
});

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
