import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loadable from "react-loadable"; // для нее отдельно скачиваются типы install @types/react-loadable

import Home from "./pages/home";
//import Cart from "./pages/cart";
//import FullPizza from "./pages/fullPizza";
// import NotFound from "./pages/notFound";

import "./scss/app.scss";
import MainLayout from "./layouts/mainLayout";

// React Lazy код сплитинг(разделение кода)для браузера а Реакт Loadable для сервера и браузера
// Lazy не работает с обычными импортами только с default
const Cart = React.lazy(
	() => import(/* webpackChunkName:"Cart" */ "./pages/cart")
); // Реакт Lazy будет подгружать этот компонент отдельно от всего бандла, только тогда когда он будет нужен
const FullPizza = React.lazy(
	() => import(/* webpackChunkName:"FullPizza" */ "./pages/fullPizza")
);
//const NotFound = React.lazy(() => import(/* webpackChunkName:"NotFound" */ "./pages/notFound"));
const NotFound = Loadable({
	loader: () => import(/* webpackChunkName:"NotFound" */ "./pages/notFound"),
	loading: () => <div>Идет загрузка страницы...</div>,
});

const App = () => {
	return (
		<Routes>
			<Route path="/pepperoni" element={<MainLayout />}>
				<Route path="/pepperoni" element={<Home />} />
				<Route
					path="/pepperoni/cart"
					element={
						<Suspense fallback={<div>Идет загрузка страницы...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="/pepperoni/pizza/:id"
					element={
						<Suspense fallback={<div>Идет загрузка страницы...</div>}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
