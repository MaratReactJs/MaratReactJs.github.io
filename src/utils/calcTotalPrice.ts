import { CartItemType } from "./../redux/cart/type";
//вынесли функцию общей суммы
export const calcTotalPrice = (items: CartItemType[]) => {
	return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
};
