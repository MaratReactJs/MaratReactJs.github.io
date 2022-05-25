import React, { useState, useEffect } from "react";

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
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
		<>
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
		</>
	);
};

export default Home;
