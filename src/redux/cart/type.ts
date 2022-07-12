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
export interface CartSliceStateType {
	totalPrice: number;
	items: CartItemType[];
}
