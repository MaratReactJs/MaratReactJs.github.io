import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// useSelector вытаскивает данные из хранилища
// useDispatch говорит сделай что-то
import qs from "qs"; // для сохранения ссылок на страницу
import { useNavigate } from "react-router-dom";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
	selectFilter,
} from "../redux/slices/filterSlice.js";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice.js";

import Sorting, { sortList } from "../components/sorting";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/categories";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzas);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const urlParametr = useRef(false);
	const firstRender = useRef(false);

	const onChangeCategory = (idx: number) => {
		dispatch(setCategoryId(idx));
		dispatch(setCurrentPage(1));
	};

	const onPageNumberChange = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `search=${searchValue}` : "";

		dispatch(
			//@ts-ignore
			fetchPizzas({ sortBy, order, category, search, currentPage })
		);
		window.scrollTo(0, 0);
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
			getPizzas();
		}
		urlParametr.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	const pizzas = items.map((obj: any) => (
		<PizzaBlock {...obj} key={obj.id}></PizzaBlock>
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sorting />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === "error" ? (
				<div className="content_error-info">
					<h2>Произошла ошибка {/* <icon></icon> */}</h2>
					<p>
						К сожалению не удалось получить питсы. Поробуйте повторить попытку
						позже
					</p>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? skeletons : pizzas}
				</div>
			)}

			<Pagination
				currentPage={currentPage}
				onPageNumberChange={onPageNumberChange}
			/>
		</div>
	);
};

export default Home;
