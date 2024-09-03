import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import AppMenu from './Menu';

// assets
import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoSm from '@/assets/images/logo-sm.png';
import logoDarkSm from '@/assets/images/logo-dark-sm.png';
import { getMenuItems } from './utils/menu';

const SideBarContent = () => {
	return (
		<>
			{/*<UserBox />*/}
			<AppMenu menuItems={getMenuItems()} />
			{/* 밑에 이건 왜 있는지 모르겠음 */}
			<div className="clearfix" />
		</>
	);
};

const LeftSidebar = () => {
	const menuNodeRef = useRef(null);

	/**
	 * Handle the click anywhere in doc
	 * 사이드바에서 다른 카테고리 열면 이전에 열었던 카테고리 닫기
	 */
	const handleOtherClick = (e) => {
		//클릭한 대상이 menuNodeRef.current가 가리키는 DOM요소 내부에 있는지 확인
		if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target))
			//있으면 그냥 return, 아무것도 안함
			return;
		// else hide the menubar
		//있으면 그 요소 삭제, 이전에 클릭했던 카테고리 닫기
		if (document.body) {
			document.body.classList.remove('sidebar-enable');
		}
	};

	//의존성 배열이 비어있어서 처음 랜더링 될 때만 실행
	useEffect(() => {
		//클릭할 때마다 위에 함수 실행
		document.addEventListener('mousedown', handleOtherClick, false);

		//이건 useEffect가 반환하는 클린업 함수
		//컴포넌트가 언마운트될 때 mousedown을 제거해서 메모리 누수 방지
		return () => {
			document.removeEventListener('mousedown', handleOtherClick, false);
		};
	}, []);

	return (
		<div className="leftside-menu" ref={menuNodeRef}>
			{/* 여기에서 로고를 바꿔주고 클릭하면 대시보드로 가게 해야함 */}
			<Link to="/" className={`logo logo-dark`}>
				<span className="logo-lg">
					<img src={logoDark} alt="logo" height="16" />
				</span>
			</Link>

			{/* maxHeight는 왼쪽 사이드바 세로 길이, width도 있는데 50%로 설정하니 사이드바 중간에 스크롤이 생김*/}
			<SimpleBar style={{ maxHeight: '80%' }} scrollbarMaxSize={320}>
				<SideBarContent />
			</SimpleBar>
		</div>
	);
};

export default LeftSidebar;
