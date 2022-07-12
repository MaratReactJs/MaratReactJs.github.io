import { RootState } from "../store";

// селектор экспортирует все данные из cartSlice мы их получаем из store.tsx
export const selectCart = (state: RootState) => state.cartSlice;

// селектор экспортрует добавленную пиццу в корзину
export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cartSlice.items.find((obj) => obj.id === id);
