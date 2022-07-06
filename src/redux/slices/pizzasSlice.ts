import { RootState } from "./../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type fetchPizzasArgsType = {
	// можно сократить код если знаешь что все свойства будут одинаковые Record <string,string> или Record <string,number> или Record <number,string>
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: number;
};

type PizzaType = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

// enum тайпскриптовая фишка
export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

interface PizzaSliceStateType {
	items: PizzaType[];
	status: Status;
}

// начальное состояние (state) пицц и их статус получения
const initialState: PizzaSliceStateType = {
	items: [],
	status: Status.LOADING,
};

// Redux не умеет работать в асинхронном режиме поэтому обработать запрос на поможет createAsyncThunk
export const fetchPizzas = createAsyncThunk<PizzaType, fetchPizzasArgsType>(
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

// селектор для получения пицц и их статусы получения
export const selectPizzas = (state: RootState) => state.pizzasSlice;

// actions это  reducers, не знаю зачем переименуется здесь, Арчаков сам не знает
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
