import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Redux не умеет работать в асинхронном режиме поэтому обработать запрос на поможет createAsyncThunk
export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasStatus",
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get(
			`https://628baebb667aea3a3e34800b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
		);
		return data;
	}
);

// начальное состояние (state) пицц и их статус получения
const initialState = {
	items: [],
	status: "loading", // loading,success, error
};

// В pizzasSlice - createSlice создаст slice где будет хранится логика обработки данных нашего state
const pizzasSlice = createSlice({
	// name нужен чтоб redux мог корректно задать определенную команду
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = "loading";
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = "success";
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = "error";
			state.items = [];
		},
	},
});

// селектор для получения пицц и их статусы получения
export const selectPizzas = (state) => state.pizzasSlice;

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
