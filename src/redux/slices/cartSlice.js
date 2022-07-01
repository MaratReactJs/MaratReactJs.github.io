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
		// увеличивает  на 1 count пиццы  внутри корзины
		addItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count;
			}, 0);
		},
		// уменьшает  на 1 count пиццы  внутри корзины
		minusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem.count > 0) {
				findItem.count--;
				state.totalPrice -= findItem.price;
			}
		},
		// удаляет пиццу  из корзины
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		//удаляет все пиццы  из корзины
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

// селектор экспортирует все данные из cartSlice
export const selectCart = (state) => state.cartSlice;

// селектор экспортрует добавленную пиццу в корзину
export const selectCartItemById = (id) => (state) =>
	state.cartSlice.items.find((obj) => obj.id === id);

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
