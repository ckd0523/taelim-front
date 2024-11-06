import { lazy } from 'react';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import JSX from '../jsx';
import { useAuthContext } from '@/common'; // 인증 및 사용자 정보 가져오기
import { Crawler } from '@/pages/jsx/Crawling/Crawler';

const ProductDetailsEcom = lazy(() => import('./ProductDetails'));
const AssetRegister = lazy(() => import('./assetCheck'));
const ExcelRegister = lazy(() => import('./ExcelAssetRegister'));
const MaintainRegister = lazy(() => import('./Maintain'));
const MaintainHist = lazy(() => import('./MaintainHistory'));
const BackupHistory = lazy(() => import('./BackupHistory'));
const AssetSurveyHistory2 = lazy(() => import('./AssetSurvey'));
const DemandHistory = lazy(() => import('./Demand'));
const UpdateHistory = lazy(() => import('./UpdateHistory'));
const DeleteHistory = lazy(() => import('./DeleteHistory'));
const Expand = lazy(() => import('./Expand'));
const AssetSurveyDetail = lazy(() => import('./AssetSurvey/AssetSurveyDetail'));
const Dashboard = lazy(() => import('./Dashboard'));

export default function jsx() {
	// useAuthContext로 현재 사용자의 정보를 가져옴
	const { user } = useAuthContext();

	// 권한에 따른 접근 제어
	const checkPermission = (allowedRoles) => {
		return allowedRoles.includes(user.role);
	};

	return (
		<Routes>
			<Route path="/*" element={<Outlet />}>
				<Route index element={<JSX />} />

				{/* 자산등록 - ADMIN만 접근 가능 */}
				<Route
					path="AssetRegister"
					element={
						checkPermission(['ADMIN']) ? (
							<AssetRegister />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>
				<Route
					path="ExcelRegister"
					element={
						checkPermission(['ADMIN']) ? (
							<ExcelRegister />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>
				<Route
					path="MaintainRegister"
					element={
						checkPermission(['ADMIN']) ? (
							<MaintainRegister />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>
				<Route
					path="MaintainHist"
					element={
						checkPermission(['ADMIN']) ? (
							<MaintainHist />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>
				<Route path="Crawling" element={<Crawler />} />

				<Route
					path=":assetCode"
					element={checkPermission(['ADMIN', 'ASSET_MANAGER', 'USER']) ? (
						<ProductDetailsEcom />
					) : (
						<Navigate to="/jsx/dashboard" />
					)
					}
				/>

				{/* 백업 내역 - ADMIN만 접근 가능 */}
				<Route
					path="BackupHistory"
					element={
						checkPermission(['ADMIN']) ? (
							<BackupHistory />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>

				{/* 자산 조사 이력 - ADMIN과 ASSET_MANAGER만 접근 가능 */}
				<Route
					path="AssetSurveyHistory"
					element={
						checkPermission(['ADMIN', 'ASSET_MANAGER']) ? (
							<AssetSurveyHistory2 />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>

				{/* 요청 내역 - ADMIN과 ASSET_MANAGER만 접근 가능 */}
				<Route
					path="DemandHistory"
					element={
						checkPermission(['ADMIN', 'ASSET_MANAGER']) ? (
							<DemandHistory />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>

				{/* 수정, 삭제 내역 - ADMIN만 접근 가능 */}
				<Route
					path="UpdateHistory"
					element={
						checkPermission(['ADMIN']) ? (
							<UpdateHistory />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>
				<Route
					path="DeleteHistory"
					element={
						checkPermission(['ADMIN']) ? (
							<DeleteHistory />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>

				{/* 자산조회 - ADMIN, ASSET_MANAGER, USER 모두 접근 가능 */}
				<Route
					path="Expand"
					element={
						checkPermission(['ADMIN', 'ASSET_MANAGER', 'USER']) ? (
							<Expand />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>
				<Route
					path="Expand/:classification"
					element={
						checkPermission(['ADMIN', 'ASSET_MANAGER', 'USER']) ? (
							<Expand />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>

				{/* 자산 조사 상세 - ADMIN과 ASSET_MANAGER만 접근 가능 */}
				<Route
					path="AssetSurveyDetail"
					element={
						checkPermission(['ADMIN', 'ASSET_MANAGER']) ? (
							<AssetSurveyDetail />
						) : (
							<Navigate to="/jsx/dashboard" />
						)
					}
				/>

				{/* 대시보드 - ADMIN, ASSET_MANAGER, USER 모두 접근 가능 */}
				<Route path="Dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
}
