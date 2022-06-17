import { createSlice } from "@reduxjs/toolkit";

// начальное состояние нашего state
const initialState = {
	totalPrice: 0,
	items: [],
};

// В cartSlice - createSlice создаст slice где будет хранится логика обработки данных нашего state
const cartSlice = createSlice({
	// name нужен чтоб redux мог корректно задать определенную команду
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.items.push(action.payload);
		},
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItem(state) {
			state.items = [];
		},
	},
});

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
