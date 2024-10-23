import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import AppMenu from './Menu';

// assets
import file from '@/assets/images/file.png';
import file_sm from '@/assets/images/file_sm.png';
import { getMenuItems } from './utils/menu';
import { Button, Modal, Col, Nav, Tab, Row, Form, InputGroup, Card } from 'react-bootstrap';
import { useToggle } from '@/hooks';
import { authApi, useAuthContext } from '@/common';

// const UserBox = () => {
// 	return (
// 		<div className="leftbar-user">
// 			<Link to="/pages/profile">
// 				<img
// 					src={profileImg}
// 					alt="user-image"
// 					height="42"
// 					className="rounded-circle shadow-sm"
// 				/>
// 				<span className="leftbar-user-name mt-2">Dominic Keller</span>
// 			</Link>
// 		</div>
// 	);
// };

const URL = import.meta.env.VITE_BASIC_URL;

//시스템 설정 모달이 뜰 때 자산 기준 금액 정보를 가져옴
const getAmountSet = async () => {
	try {
		const response = await fetch(`${URL}/getAmountSet`);
		const data = await response.json();
		//console.log('받은 데이터 : ' + JSON.stringify(data));
		//console.log("고가치 기준 금액 : " + data.high_value_standard);
		return data;
	} catch (error) {
		console.error('error : ', error);
		return null; // 에러가 발생하면 null을 반환합니다.
	}
};

const SideBarContent = () => {
	const [signUpModal, toggleSignUp] = useToggle(false);
	const [amountSetData, setAmountSetData] = useState(null);
	const [modify, setModify] = useState(false);
	//console.log("얘 뭔데" + signUpModal);

	// signUpModal이 true일 때만 실행되도록 설정
	useEffect(() => {
		//금액 수정 상태에서 모달 종료하고 다시 들어왔을 때 다시 수정 버튼 누르게
		setModify(true);
		if (signUpModal) {
			// signUpModal이 true일 때만 실행
			setAmountSetData(null);
			const fetchData = async () => {
				const data = await getAmountSet(); // 데이터를 fetch
				setAmountSetData(data); // 데이터를 상태에 저장
			};
			fetchData();
		}
	}, [signUpModal]); // 의존성 배열에 signUpModal을 추가

	const ChangeModify = () => {
		if (modify) {
			setModify(false);
		} else {
			saveAmountSet();
			setModify(true);
		}
	};

	// 자산 가치 기준 금액 설정 요청
	const saveAmountSet = async () => {
		try {
			const response = await fetch(`${URL}/changeAmountSet`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(amountSetData), // amountSetData를 서버로 전송
			});

			if (!response.ok) {
				throw new Error('서버 요청 실패');
			}
			alert('저장이 완료되었습니다.');
		} catch (error) {
			console.error('저장 중 오류 발생:', error);
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	//console.log("변경되는 값1 : " + amountSetData.high_value_standard);
	//console.log("변경되는 값2 : " + amountSetData.low_value_standard);

	return (
		<>
			{/* 모달 컴포넌트 */}
			<Modal show={signUpModal} onHide={toggleSignUp} size="lg">
				<Modal.Header>
					<Modal.Title>시스템 설정</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Tab.Container id="left-tabs-example" defaultActiveKey="first">
						<Row>
							<Col sm={3}>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first">자산 기준 금액 설정</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">설정 2</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>

							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										<Row>
											<Col lg={4}>
												<label>고가치 기준 금액</label>
												<InputGroup>
													<Form.Control
														type="number"
														value={
															amountSetData
																? amountSetData.high_value_standard
																: -1
														}
														disabled={modify}
														onChange={(e) =>
															setAmountSetData((prev) => ({
																...prev,
																high_value_standard: e.target.value,
															}))
														}
														min={0}
													/>
												</InputGroup>
											</Col>

											<Col lg={4}>
												<label>저가치 기준 금액</label>
												<InputGroup>
													<Form.Control
														type="number"
														value={
															amountSetData
																? amountSetData.low_value_standard
																: -1
														}
														disabled={modify}
														onChange={(e) =>
															setAmountSetData((prev) => ({
																...prev,
																low_value_standard: e.target.value,
															}))
														}
														min={0}
													/>
												</InputGroup>
											</Col>
										</Row>
										<br></br>
										<Modal.Footer>
											<Button
												style={{ background: '#5e83bb', border: 'none' }}
												onClick={ChangeModify}
											>
												{modify ? '수정' : '저장'}
											</Button>
											<Button variant="secondary" onClick={toggleSignUp}>
												닫기
											</Button>
										</Modal.Footer>
									</Tab.Pane>

									<Tab.Pane eventKey="second">
										설정2에 필요한 것이 있으면 말씀해주세요
										<Modal.Footer>
											<Button variant="secondary" onClick={toggleSignUp}>
												닫기
											</Button>
										</Modal.Footer>
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</Modal.Body>
			</Modal>

			{/* 메뉴 */}
			<AppMenu menuItems={getMenuItems()} onSystemSettingClick={toggleSignUp} />
			<div className="clearfix" />
		</>
	);
};

const LeftSidebar = ({ isCondensed, leftbarDark }) => {
	const menuNodeRef = useRef(null);
	const { removeSession, user } = useAuthContext();

	const logout = async () => {
		try {
			const response = await authApi.logout();
			console.log(response);
			if (response.status === 200) {
				removeSession();
			}
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Handle the click anywhere in doc
	 */
	const handleOtherClick = (e) => {
		if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
		// else hide the menubar
		if (document.body) {
			document.body.classList.remove('sidebar-enable');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOtherClick, false);

		return () => {
			document.removeEventListener('mousedown', handleOtherClick, false);
		};
	}, []);

	return (
		<div className="leftside-menu" ref={menuNodeRef} style={{ background: '#003c75' }}>
			<Link
				to="/"
				className={`logo ${leftbarDark ? 'logo-light' : 'logo-dark'}`}
				style={{ background: '#003c75' }}
			>
				<span className="logo-lg">
					<img src={file} alt="logo" height="30" />
				</span>
				<span className="logo-sm">
					<img src={file_sm} alt="logo" height="30" />
				</span>
			</Link>



			{!isCondensed && (
				<>
					<div className='d-flex justify-content-center'>
						<p style={{ color: 'white' }}>{user.name}님 접속되었습니다.</p>
					</div>

					<div className='d-flex justify-content-center'>
						<Button className="btn btn-dark" onClick={logout}>로그아웃</Button>
					</div>

					<SimpleBar style={{ maxHeight: '100%' }} scrollbarMaxSize={320}>
						<SideBarContent />
					</SimpleBar>
				</>
			)}
			{isCondensed && (
				<>
					<ul className='side-nav' style={{ marginBottom: '0' }}>
						<li className='side-nav-item'>
							<a className='side-nav-link-ref side-nav-link' data-menu-key="" href='#' onClick={logout}>
								<i className='ri-logout-box-line' />
								<span>로그아웃</span>
							</a>
						</li>
					</ul>
					<SideBarContent />
				</>
			)}
		</div>
	);
};

export default LeftSidebar;
