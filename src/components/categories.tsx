import React from "react";

type CategoriesProps = {
	value: number;
	onChangeCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, idx) => (
					<li
						onClick={() => {
							onChangeCategory(idx);
						}}
						className={value === idx ? "active" : ""}
						key={idx}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
