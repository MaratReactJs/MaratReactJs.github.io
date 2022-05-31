import React, { useState, useEffect } from "react";

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: "популярности",
		sortProperty: "rating",
	});
	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://628baebb667aea3a3e34800b.mockapi.io/items?${
				categoryId > 0 ? `category=${categoryId}` : ""
			}&sortBy=${sortType.sortProperty}&order=desc`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);
	console.log(categoryId, sortType);
	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(i) => setCategoryId(i)}
				/>
				<Sorting value={sortType} onChangeSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
			</div>
		</div>
	);
};

export default Home;
