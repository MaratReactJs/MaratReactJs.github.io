import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
	reducer: {
		filterSlice,
		cartSlice,
		pizzasSlice,
	},
});

// фнкция getState вытаскивает весь store, это функция со всеми типами всех slice
// ReturnType получает любую функцию и её содержимое превращает в тип, т.е. из функции с типами вытаскивает типы
// в итоге мы получаем все типы из store
// Теперь внутри RootState хранятся все типы slice
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
