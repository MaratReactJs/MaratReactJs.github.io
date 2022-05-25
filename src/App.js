import React, { useState, useEffect } from "react";
import PizzaBlock from "./components/pizzaBlock";
import Categories from "./components/categories";
import Header from "./components/header";
import Sorting from "./components/sorting";
import "./scss/app.scss";
import Skeleton from "./components/pizzaBlock/skeleton";

const App = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch("https://628baebb667aea3a3e34800b.mockapi.io/items")
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
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
						{isLoading
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
