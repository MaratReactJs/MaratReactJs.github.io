import React from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import FullPizza from "./pages/fullPizza";
import NotFound from "./pages/notFound";
import "./scss/app.scss";
import MainLayout from "./layouts/mainLayout";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/pizza/:id" element={<FullPizza />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
