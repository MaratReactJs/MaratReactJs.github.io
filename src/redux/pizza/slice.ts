import { RootState } from "./../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
	FetchPizzasArgsType,
	PizzaSliceStateType,
	PizzaType,
	Status,
} from "./type";

// начальное состояние (state) пицц и их статус получения
const initialState: PizzaSliceStateType = {
	items: [],
	status: Status.LOADING,
};

// Redux не умеет работать в асинхронном режиме поэтому обработать запрос на поможет createAsyncThunk
export const fetchPizzas = createAsyncThunk<PizzaType[], FetchPizzasArgsType>(
	"pizza/fetchPizzasStatus",
	// можно было так сделать params:Record <string,string>
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get(
			`https://628baebb667aea3a3e34800b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
		);
		return data; // можно было написать data:PizzaType[]
	}
);

// В pizzasSlice - createSlice создаст slice где будет хранится логика обработки данных нашего state
const pizzasSlice = createSlice({
	// name нужен чтоб redux мог корректно задать определенную команду
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaType[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.SUCCESS;
			state.items = [];
		});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
