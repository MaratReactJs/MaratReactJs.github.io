import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// useSelector вытаскивает данные из хранилища
// useDispatch говорит сделай что-то
import { setCategoryId } from "../redux/slices/filterSlice.js";

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/categories";
import Sorting from "../components/sorting";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
	const categoryId = useSelector((state) => state.filterSlice.categoryId);
	const dispatch = useDispatch();

	console.log("redux", categoryId);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	// const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: "популярности",
		sortProperty: "rating",
	});
	const [currentPage, setCurrentPage] = useState(1);
	const { searchValue } = useContext(SearchContext);

	const sortBy = sortType.sortProperty.replace("-", "");
	const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
	const category = categoryId > 0 ? `category=${categoryId}` : "";
	const search = searchValue ? `&search=${searchValue}` : "";

	const onChangeCategory = (id) => {
		console.log(id);
		dispatch(setCategoryId(id));
	};

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://628baebb667aea3a3e34800b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
				window.scrollTo(0, 0);
			});
	}, [categoryId, sortType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
	/* 	.filter((item) =>
	item.title.toLowerCase().includes(searchValue.toLowerCase()) */

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sorting value={sortType} onChangeSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
};

export default Home;
