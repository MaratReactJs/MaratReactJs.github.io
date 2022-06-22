import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// useSelector вытаскивает данные из хранилища
// useDispatch говорит сделай что-то
import axios from "axios";
import qs from "qs"; // для сохранения ссылок на страницу
import { useNavigate } from "react-router-dom";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice.js";

import Sorting, { sortList } from "../components/sorting";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/categories";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filterSlice
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const urlParametr = useRef(false);
	const firstRender = useRef(false);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { searchValue } = useContext(SearchContext);
	const sortBy = sort.sortProperty.replace("-", "");
	const order = sort.sortProperty.includes("-") ? "asc" : "desc";
	const category = categoryId > 0 ? `category=${categoryId}` : "";
	const search = searchValue ? `search=${searchValue}` : "";

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
		dispatch(setCurrentPage(1));
	};

	const onPageNumberChange = (number) => {
		dispatch(setCurrentPage(number));
	};

	const fetchPizzas = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				`https://628baebb667aea3a3e34800b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
			);
			setItems(res.data);
			window.scrollTo(0, 0);
		} catch (error) {
			alert("Ошибка при получение пицц");
		} finally {
			setIsLoading(false);
		}
	};

	// При первом рендере проверяет URL-параметры и сохраняет в redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);
			dispatch(setFilters({ ...params, sort }));
			urlParametr.current = true;
		}
	}, []);

	//Если изменили параметры и был первый рендер, вшивает в адресную строчку URL-параметры
	useEffect(() => {
		if (firstRender.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		firstRender.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	// Если нет URL-параметров, обновляет данные при первом рендере или при изменение параметров
	useEffect(() => {
		if (!urlParametr.current) {
			fetchPizzas();
		}
		urlParametr.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sorting />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination
				currentPage={currentPage}
				onPageNumberChange={onPageNumberChange}
			/>
		</div>
	);
};

export default Home;
