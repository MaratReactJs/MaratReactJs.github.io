import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState({
		imageUrl: "string",
		title: "string",
		price: "number",
	});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizzas() {
			try {
				const { data } = await axios.get(
					"https://628baebb667aea3a3e34800b.mockapi.io/items/" + id
				);
				setPizza(data);
			} catch (error) {
				alert("ошибка при получение одной пиццы");
				navigate("/");
			}
		}
		fetchPizzas();
	}, []);

	if (!pizza) {
		return <>Загрузка...</>;
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>

			<h2>{pizza.price}₽</h2>
		</div>
	);
};

export default FullPizza;
