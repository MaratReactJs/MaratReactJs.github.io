import React from "react";
import PizzaBlock from "./components/pizzaBlock";
import Categories from "./components/categories";
import Header from "./components/header";
import Sorting from "./components/sorting";
import "./scss/app.scss";
import pizzasArray from "./assets/pizzas.json";

const App = () => {
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
						{pizzasArray.map((obj) => (
							<PizzaBlock {...obj} key={obj.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
