import React, { useCallback, useEffect, useRef } from "react";
// useSelector вытаскивает данные из хранилища
// useDispatch говорит сделай что-то
import qs from "qs"; // для сохранения ссылок на страницу
import { useNavigate } from "react-router-dom";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/filter/slice";
import {
	fetchPizzas,
	FetchPizzasArgsType,
	selectPizzas,
} from "../redux/slices/pizzasSlice";

import Sorting, { sortList } from "../components/sorting";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/categories";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { selectFilter } from "../redux/filter/selectors";

const Home: React.FC = () => {
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzas);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const urlParametr = useRef(false); // для того чтобы показать есть ли сохранненые параметры страницы или нет
	const firstRender = useRef(false); // для того чтобы знать когда был первый рендер страницы

	// функция изменения категории, она каждый раз пересоздается когда компонент делает перерисовку
	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
		dispatch(setCurrentPage(1));
	}, []);
	// функция изменения номера страницы
	const onPageNumberChange = (pageNumber: number) => {
		console.log(pageNumber);
		dispatch(setCurrentPage(pageNumber));
	};

	const getPizzas = async () => {
		// для начала корректируем данные
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `search=${searchValue}` : "";
		//теперь эти данные вставляем в функцию
		dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
		window.scrollTo(0, 0);
	};

	//Если изменили параметры и был первый рендер, вшивает в адресную строчку URL-параметры
	useEffect(() => {
		if (firstRender.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`/?${queryString}`);
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

	// При первом рендере проверяет URL-параметры и сохраняет в redux тоесть парсит
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as FetchPizzasArgsType;

			const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				})
			);

			urlParametr.current = true;
		}
	}, []);

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
				<Sorting value={sort} />
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
