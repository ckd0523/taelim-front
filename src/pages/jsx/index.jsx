import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import JSX from '../jsx';

const ProductDetailsEcom = lazy(() => import('./ProductDetails'));
const AssetRegister = lazy(() => import('./assetCheck'));
const ExcelRegister = lazy(() => import('./ExcelAssetRegister'));
const MaintainRegister = lazy(() => import('./Maintain'));
const MaintainHist = lazy(() => import('./MaintainHistory'));
const BackupHistory = lazy(() => import('./BackupHistory'));
const AssetSurveyHistory = lazy(() => import('./AssetSurvey'));
const DemandHistory = lazy(() => import('./Demand'));
const UpdateHistory = lazy(() => import('./UpdateHistory'));
const DeleteHistory = lazy(() => import('./DeleteHistory'));
const Expand = lazy(() => import('./Expand'));
const AssetPage = lazy(() => import('./assetUpdate'));
const AssetSurveyDetail = lazy(() => import('./AssetSurvey/AssetSurveyDetail'));
const SystemSetting = lazy(() => import('./SystemSetting'));

export default function jsx() {
	return (
		<Routes>
			<Route path="/*" element={<Outlet />}>
				<Route index element={<JSX />} />
				{/* 자산등록 */}
				<Route path="AssetRegister" element={<AssetRegister />} />
				<Route path="ExcelRegister" element={<ExcelRegister />} />
				<Route path="MaintainRegister" element={<MaintainRegister />} />
				<Route path="MaintainHist" element={<MaintainHist />} />
				<Route path="ProductDetailsEcom" element={<ProductDetailsEcom />} />
				<Route path="BackupHistory" element={<BackupHistory />} />
				<Route path="AssetSurveyHistory" element={<AssetSurveyHistory />} />
				<Route path="DemandHistory" element={<DemandHistory />} />
				<Route path="UpdateHistory" element={<UpdateHistory />} />
				<Route path="DeleteHistory" element={<DeleteHistory />} />
				<Route path="Expand" element={<Expand />} />
				<Route path="AssetPage" element={<AssetPage />} />
				<Route path="AssetSurveyDetail" element={<AssetSurveyDetail />} />
				{/* <Route path="SystemSetting" element={<SystemSetting />} /> */}
			</Route>
		</Routes>
	);
}
