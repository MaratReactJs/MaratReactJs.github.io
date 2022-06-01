import React, { useState, useEffect } from "react";

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: "популярности",
		sortProperty: "rating",
	});

	const sortBy = sortType.sortProperty.replace("-", "");
	const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
	const category = categoryId > 0 ? `category=${categoryId}` : "";
	const search = searchValue ? `&search=${searchValue}` : "";

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://628baebb667aea3a3e34800b.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue]);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
	/* 	.filter((item) =>
	item.title.toLowerCase().includes(searchValue.toLowerCase()) */

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
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination />
		</div>
	);
};

export default Home;
