import React, { useState, useEffect } from "react";
import PizzaBlock from "./components/pizzaBlock";
import Categories from "./components/categories";
import Header from "./components/header";
import Sorting from "./components/sorting";
import "./scss/app.scss";

const App = () => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch("https://628baebb667aea3a3e34800b.mockapi.io/items").then((res) =>
			res.json().then((json) => {
				setItems(json);
			})
		);
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sorting />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{items.map((obj) => (
							<PizzaBlock {...obj} key={obj.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
