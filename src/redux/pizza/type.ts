export type FetchPizzasArgsType = {
	// можно сократить код если знаешь что все свойства будут одинаковые Record <string,string> или Record <string,number> или Record <number,string>
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: number;
};

export type PizzaType = {
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

export interface PizzaSliceStateType {
	items: PizzaType[];
	status: Status;
}
