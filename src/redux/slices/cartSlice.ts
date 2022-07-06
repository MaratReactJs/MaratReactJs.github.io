import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
	//экспортируем для items из функции addItems в PizzaBlock
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	count: number;
	types: string;
	sizes: number;
};
// type и interface в принципе похожи, только interface типизирует только объекты а type все
// есть негласное правило типизировать state интерфэйсом
interface CartSliceStateType {
	totalPrice: number;
	items: CartItemType[];
}

// начальное состояние (state) итоговой цены и колличества шт в корзине
const initialState: CartSliceStateType = {
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
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count;
			}, 0);
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

// селектор экспортирует все данные из cartSlice мы их получаем из store.tsx
export const selectCart = (state: RootState) => state.cartSlice;

// селектор экспортрует добавленную пиццу в корзину
export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cartSlice.items.find((obj) => obj.id === id);

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
