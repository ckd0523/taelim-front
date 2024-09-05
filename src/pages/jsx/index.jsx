import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import JSX from '../jsx';

const ProductDetailsEcom = lazy(() => import('./ProductDetails'));
const AssetRegister = lazy(() => import('./assetCheck'));
const BackupHistory = lazy(() => import('./BackupHistory'));
const AssetSurveyHistory = lazy(() => import('./AssetSurvey'));
const Software = lazy(() => import('./assetUpdate'));
// const Contact = lazy(() => import('./assetUpdate'));
//const AssetPage = lazy(() => import('./assetUpdate'));

export default function jsx() {
	return (
		<Routes>
			<Route path="/*" element={<Outlet />}>
				<Route index element={<JSX />} />
				{/* 자산등록 */}
				<Route path="AssetRegister" element={<AssetRegister />} />
				<Route path="ProductDetailsEcom" element={<ProductDetailsEcom />} />
				<Route path="BackupHistory" element={<BackupHistory />} />
				<Route path="AssetSurveyHistory" element={<AssetSurveyHistory />} />
				<Route path="Software" element={<Software />} />
				{/* <Route path="Contact" element={<Contact />} /> */}
				{/* <Route path="AssetPage" element={<AssetPage />} /> */}
			</Route>
		</Routes>
	);
}
