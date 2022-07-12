import { calcTotalPrice } from "./../../utils/calcTotalPrice";
import { getCartFromLS } from "./../../utils/getCartFromLS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartSliceStateType } from "./type";

const { items, totalPrice } = getCartFromLS();

// начальное состояние (state) итоговой цены и колличества шт в корзине
const initialState: CartSliceStateType = {
	totalPrice,
	items,
};

// В cartSlice - createSlice создаст slice где будет хранится логика обработки данных нашего state
const cartSlice = createSlice({
	// name нужен чтоб redux мог корректно задать определенную команду
	name: "cart",
	initialState,
	reducers: {
		// увеличивает  на 1 count пиццы  внутри корзины
		addItem(state, action: PayloadAction<CartItemType>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = calcTotalPrice(state.items);
		},

		// уменьшает  на 1 count пиццы  внутри корзины
		minusItem(state, action: PayloadAction<CartItemType>) {
			// тип string так как мы передаем только id
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem && findItem.count > 0) {
				findItem.count--;
				state.totalPrice -= findItem.price;
			}
		},
		// удаляет пиццу  из корзины
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		//удаляет все пиццы  из корзины
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
