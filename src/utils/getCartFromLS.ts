import { calcTotalPrice } from "./calcTotalPrice";
// получаем пиццы из LS и эту функцию распакуем в redux
export const getCartFromLS = () => {
	const data = localStorage.getItem("cart");
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calcTotalPrice(items);

	return { items, totalPrice };
};
