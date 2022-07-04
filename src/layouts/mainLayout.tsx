import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/header";

// создали для того чтобы вынести разметку из  App.tsx
const MainLayout: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
