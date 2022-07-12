import pizzasSlice from "../slices/pizzasSlice";
import { RootState } from "../store";

// селектор для получения пицц и их статусы получения
export const selectPizzas = (state: RootState) => state.pizzasSlice;

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
