import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import {
	setSort,
	SortPropertyEnum,
	SortType,
} from "../redux/slices/filterSlice";
import { useWhyDidYouUpdate } from "use-why-did-you-update";

// типы для сортировки

type SortingProps = {
	value: SortType;
};

export const sortList: SortType[] = [
	// с помощью минуса создаем уникальность
	{ name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
	{ name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
	{ name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
	{ name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
	{ name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
	{ name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sorting: React.FC<SortingProps> = memo(({ value }) => {
	useWhyDidYouUpdate("Sorting", { value });
	const dispatch = useDispatch();
	console.log("сортировка");

	const [open, setOpen] = useState(false); // открыт ли popup или нет
	const sortRef = useRef<HTMLDivElement>(null);

	//закрытие popup при клике на другую область
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sortRef.current &&
				!event.composedPath().includes(sortRef.current) &&
				!open
			) {
				setOpen(false);
			}
		};
		document.body.addEventListener("click", handleClickOutside);
		return () => document.body.removeEventListener("click", handleClickOutside);
	}, []);

	// функция выбора свойства сортировки
	const handleSelected = (obj: SortType) => {
		console.log(obj);
		dispatch(setSort(obj));
		setOpen(false);
	};

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{value.name}</span>
			</div>
			{open && (
				<div className="sort__popup">
					<ul>
						{sortList.map((obj, i) => (
							<li
								onClick={() => {
									handleSelected(obj);
								}}
								className={
									value.sortProperty === obj.sortProperty ? "active" : ""
								}
								key={i}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});

export default Sorting;
