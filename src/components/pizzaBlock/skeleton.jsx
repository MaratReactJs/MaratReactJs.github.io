import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
	<ContentLoader
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}>
		<circle cx="138" cy="138" r="138" />
		<rect x="0" y="296" rx="10" ry="10" width="280" height="23" />
		<rect x="0" y="345" rx="10" ry="10" width="280" height="88" />
		<rect x="-35" y="656" rx="0" ry="0" width="152" height="45" />
		<rect x="0" y="455" rx="10" ry="10" width="95" height="30" />
		<rect x="125" y="446" rx="24" ry="24" width="152" height="45" />
	</ContentLoader>
);

export default Skeleton;
