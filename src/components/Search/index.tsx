import React, { useCallback, useRef, useState } from "react";

import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
	// отвечает за быстрое получение данных из инпут
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const onClickClear = () => {
		dispatch(setSearchValue(""));
		setValue("");
		inputRef.current?.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			console.log(str);
			dispatch(setSearchValue(str));
		}, 150),
		[]
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground="new 0 0 32 32"
				id="Editable-line"
				version="1.1"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg">
				<circle
					cx="14"
					cy="14"
					fill="none"
					id="XMLID_42_"
					r="9"
					stroke="#000000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth="2"
				/>
				<line
					fill="none"
					id="XMLID_44_"
					stroke="#000000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth="2"
					x1="27"
					x2="20.366"
					y1="27"
					y2="20.366"
				/>
			</svg>

			<input
				value={value}
				ref={inputRef}
				className={styles.input}
				placeholder="Поиск пиццы..."
				onChange={onChangeInput}
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					version="1.1"
					viewBox="0 0 50 50"
					xmlns="http://www.w3.org/2000/svg">
					<g id="Layer_1">
						<polygon points="2.707,48.707 25,26.414 47.293,48.707 48.707,47.293 26.414,25 48.707,2.707 47.293,1.293 25,23.586 2.707,1.293    1.293,2.707 23.586,25 1.293,47.293  " />
					</g>
					<g />
				</svg>
			)}
		</div>
	);
};

export default Search;
