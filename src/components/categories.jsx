import React, { useState } from "react";

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0);
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
				{categories.map((el, index) => (
					<li
						onClick={() => {
							setActiveIndex(index);
						}}
						className={activeIndex === index ? "active" : ""}
						key={index}>
						{el}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
