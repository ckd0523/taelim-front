import React, { useEffect, useRef, useState } from 'react';
import $, { event } from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt';
import axios from 'axios';
import TextInput from '@/components/Form/TextInput';
import { useForm, FormProvider } from 'react-hook-form';
import { DateInput } from '@/components';
import { bottom } from '@popperjs/core';
import { Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { formatDate } from '@fullcalendar/core';
import Swal from 'sweetalert2';
const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetSurveyHistory = () => {
	const tableRef = useRef(null);
	const [data, setData] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]); //어떤 자산 조사 선택했는지 저장

	// 서버로부터 데이터를 가져오는 함수
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${urlConfig}/assetSurveyHistory`);
				setData(response.data); // API로부터 받은 데이터 설정
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []); // 여기 빈 배열을 넣으면 이 useEffect는 이 페이지가 호출될 때 한번만 실행됨
	// 그것이 빈 의존성 배열임, 밑에는 의존성이 있어서 값이 바뀔 때마다 테이블을 재렌더링함

	// DataTable 초기화
	useEffect(() => {
		if (data.length > 0) {
			$(tableRef.current).DataTable({
				data: data, // 데이터 배열을 넘겨줌
				columns: [
					{
						title: '',
						data: null,
						render: (data, type, row, meta) => {
							// 각 행에 네모난 체크박스 버튼 추가
							//input 태그 안에 value는 무조건 string으로 반환함
							return `
                <input type="checkbox" class="selectCheckbox" value="${row.assetSurveyNo}" />
              `;
						},
					},
					{ title: '자산조사번호', data: 'assetSurveyNo' },
					{ title: '회차', data: 'round' },
					{ title: '위치', data: 'assetSurveyLocation' },
					{ title: '자산조사일자', data: 'assetSurveyStartDate' },
					{ title: '자산조사자', data: 'assetSurveyBy' },
					{
						title: '상태',
						data: 'surveyStatus',
						render: (data) => {
							// 상태 값이 0이면 "Inactive", 1이면 "Active"로 변환
							return data === false ? '조사중' : '조사 완료';
						},
					},
				],
				paging: true, // 페이징 활성화
				pageLength: 10, // 페이지당 10개의 row
				destroy: true, // 테이블을 재구성할 때 기존 테이블 삭제
				search: false,
			});

			// 체크박스 선택 상태 추적
			$(tableRef.current).on('change', '.selectCheckbox', function () {
				console.log(1);
				//input 태그 안에 value는 무조건 string으로 반환하기 때문에 int로 변환
				//하지만 백에서 쓰는 타입은 long인데 여기서는 long으로 변환 불가
				//백으로 int로 가져가서 long으로 다시 변환
				const id = parseInt($(this).val(), 10); // id를 숫자로 변환
				console.log(id);
				const row = data.find((item) => item.assetSurveyNo === id);
				console.log(row);

				if (row) {
					if (row.surveyStatus === true) {
						// "조사 완료" 상태일 때 경고창 표시

						Swal.fire({
							icon: 'error',
							title: '완료된 조사는 선택 불가합니다.',
						});
						// 체크박스 선택 해제
						$(this).prop('checked', false);
					} else {
						// "조사중" 상태일 때 상태 업데이트
						if ($(this).is(':checked')) {
							setSelectedIds((prevIds) => [...prevIds, id]);
						} else {
							setSelectedIds((prevIds) => prevIds.filter((item) => item !== id));
						}
					}
				}
			});
		}
	}, [data, setSelectedIds]); // data가 바뀔 때마다 테이블을 다시 렌더링
	//빈 의존성 배열이 아니기 때문에 data와 setSelectedIds가 바뀔 때 마다 재렌더링함

	//자산조사 등록에 필요한 변수들
	const [registerData, setRegisterData] = useState({
		location: '',
		email: 'user10@example.com',
	});

	//자산 조사 등록
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);

	const handlePostRequest = () => {
		axios
			.post(`${urlConfig}/register`, registerData) // 서버에 보낼 데이터
			.then((response) => {
				setResponse(response.data); // 응답 데이터 상태 업데이트
			})
			.catch((error) => {
				setError(error.message); // 오류 상태 업데이트
			});
	};

	// 자산조사 삭제 핸들러
	const handleDelete = async () => {
		console.log(selectedIds); //int 타입
		try {
			await axios.post(`${urlConfig}/deleteAssetSurvey`, {
				assetSurveyNo: selectedIds,
			});

			// 삭제 후 데이터 재조회 또는 다른 작업
			console.log('삭제 성공');
			setSelectedIds([]); // 선택 상태 초기화
		} catch (error) {
			console.error('Error deleting assets:', error);
		}
	};

	//const methods = useForm();

	//자산조사 검색에 필요한 변수들
	const [searchData, setSearchData] = useState({
		round: '',
		surveyBy: '',
		location: '',
		surveyStartDate: new Date(),
		surveyEndDate: new Date(),
	});

	const assetSurveyLocation = [
		{ value: 'MAIN_B1_DOCUMENT_STORAGE', label: '본관 지하 문서고' },
		{ value: 'MAIN_1F', label: '본관 1층' },
		{ value: 'MAIN_1F_RECEPTION_ROOM', label: '본관 1층 접견실' },
		{ value: 'MAIN_2F', label: '본관 2층' },
		{ value: 'MAIN_2F_PRESIDENT_OFFICE', label: '본관 2층 사장실' },
		{ value: 'MAIN_2F_RESEARCH_OFFICE', label: '본관 2층 기술연구소 사무실' },
		{ value: 'MAIN_2F_CONFERENCE_ROOM', label: '본관 2층 대회의실' },
		{ value: 'MAIN_2F_CEO_OFFICE', label: '본관 2층 대표이사실' },
		{ value: 'MAIN_3F_STORAGE', label: '본관 3층 창고' },
		{ value: 'MDCG', label: 'MDCG' },
		{ value: 'FACTORY_BUILDING', label: '공장동' },
	];

	const handleChange3 = (e) => {
		const { name, value } = e.target; //e에서 name과 value만 추출
		setSearchData((prevState) => ({
			...prevState, // 이전 상태를 복사, 이게 있어야하는 이유는 location만 변경하려고 해도 다른 값들은 초기화가 되어버리기 때문
			[name]: value, // 변경하려는 속성만 업데이트
		}));
		//console.log(searchData.location);
	};

	//위치가 제대로 입력되는지 확인용
	useEffect(() => {
		console.log(registerData.location);
	}, [registerData]); // searchData 전체가 변경될 때마다 실행

	//위치가 제대로 입력되는지 확인용
	useEffect(() => {
		console.log(searchData.location);
	}, [searchData]); // searchData 전체가 변경될 때마다 실행

	//회차를 입력 시 숫자만 가능하도록
	const handleRoundChange = (e) => {
		const { value } = e.target;

		// 숫자인지 확인하는 정규 표현식
		const isNumber = /^[0-9]*$/.test(value);

		if (isNumber || value === '') {
			setSearchData((prevState) => ({
				...prevState,
				round: value, // 유효한 값만 업데이트
			}));
		} else {
			Swal.fire({
				icon: 'error',
				title: '회차는 숫자만 입력 가능합니다.',
			});
		}
	};

	//날짜 포맷팅
	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const formattedDate = formatDate(new Date());

	//모달창을 위함
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="card">
						{/* 이건 상단에 card가 너무 딱 붙어서 새로운 card를 추가해서 간격을 주기 위함 */}
					</div>
				</div>
				<div className="card">
					<div className="card-body">
						{/* row에 row-cols-auto 하면 조사일자에 ~과 날짜 선택 간격 좁아짐 */}
						<div className="row row-cols-auto">
							<div className="col-sm-1">
								<label className="form-label">회차</label>
								<input
									type="text"
									className="form-control"
									value={searchData.round}
									onChange={handleRoundChange}
									name="round"
								></input>
							</div>
							<div className="col-sm-1">
								<label className="form-label">조사자</label>
								<input
									type="text"
									className="form-control"
									value={searchData.surveyBy}
									onChange={handleChange3}
									name="surveyBy"
								></input>
							</div>
							<div className="col-sm-2">
								<label className="form-label">위치</label>
								<select
									type="select"
									className="form-select"
									value={searchData.location}
									onChange={(e) =>
										handleChange3({
											target: {
												name: 'location',
												value: e.target.value,
											},
										})
									}
									name="location"
									//현민씨가 한 버전에서는 여기에
									//option={assetSurveyLocation} 을 넣으면 되는데
									//여기서는 리액트 라이브러리 기반 <Select> 컴포넌트를 쓰지 않기 때문에
									//<select>안에 map으로 assetSurveyLocation의 값을
									//<option> 태그를 하나하나 만들어줘야함
								>
									<option value="" disabled>
										위치를 선택하세요
									</option>
									{assetSurveyLocation.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>
							<div className="col-sm-2">
								<label className="form-label">조사일자</label>
								<input
									type="date"
									className="form-control"
									//value={searchData.surveyBy}
									//onChange={handleChange3}
									//name='surveyBy'
								></input>
							</div>
							{/* 좌우 sm-2를 붙이면 우측 간격이 너무 넓어져서 없애고 row에 속성 추가 */}
							<div className="col align-self-center" style={{ marginTop: 30 }}>
								~
							</div>
							<div className="col-sm-2 align-self-end">
								{/* style에 visibility를 설정해주면 태그안 내용이 있어도 보이지 않고 레이아웃 공간은 유지할 수 있음
									이렇게 해서 조사일자 선택 박스의 높이를 맞춰줌
									보이지도 않고 레이아웃에도 영향 안주려면 style={{ display: 'none' }} 이렇게
								*/}
								{/* <label className='form-label' style={{ visibility: 'hidden' }}>드디어 해결했다</label> */}
								<input
									type="date"
									className="form-control"
									//value={searchData.surveyBy}
									//onChange={handleChange3}
									//name='surveyBy'
								></input>
							</div>
							<div className="col-sm-2 align-self-end">
								{/* <label className='form-label' style={{ visibility: 'hidden' }}>드디어 해결했다</label> */}
								<button type="button" className="btn btn-warning">
									<i className="ri-search-line">
										<span> Search</span>
									</i>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="row row-cols-auto justify-content-end">
					<div className="col">
						<button className="btn btn-success">엑셀 출력</button>
					</div>
					<div className="col">
						<button className="btn btn-danger" onClick={handleDelete}>
							자산조사 삭제
						</button>
					</div>
					<div className="col">
						{/* AssetSurveyRegister가 div로 안 감싸져 있으면 오류남 */}
						{/* <AssetSurveyRegister /> */}
						<Button variant="primary" onClick={handleShow}>
							자산 조사 등록
						</Button>

						{/* 자산 조사 등록 버튼을 누르면 나오는 모달창 */}
						<Modal show={show} onHide={handleClose}>
							<Modal.Body>
								<Form>
									<Form.Group className="mb-3">
										<Form.Label>위치</Form.Label>
										{/* <label htmlFor="recipient-name" className="col-form-label">위치</label> 
										<input type="text" className="form-control" id="location"></input> */}
										<Select
											options={assetSurveyLocation}
											placeholder="위치를 선택하세요"
											value={registerData.location}
										></Select>
									</Form.Group>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label">
											회차
										</label>
										<input
											type="text"
											className="form-control"
											id="round"
											placeholder="백에서 처리하고 싶당"
										></input>
									</div>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label">
											조사자
										</label>
										<input
											type="text"
											className="form-control"
											id="surveyBy"
											value={registerData.email}
											readOnly
										></input>
									</div>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label">
											조사일자
										</label>
										<input
											type="text"
											className="form-control"
											id="surveyDate"
											value={formattedDate}
											readOnly
										></input>
									</div>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary">확인</Button>
								<Button variant="secondary" onClick={handleClose}>
									취소
								</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
				<br></br>
				<table ref={tableRef} className="display" style={{ width: '100%' }}>
					<thead>
						<tr>
							<th></th>
							<th>자산조사번호</th>
							<th>회차</th>
							<th>위치</th>
							<th>자산조사일자</th>
							<th>자산조사자</th>
							<th>상태</th>
						</tr>
					</thead>
					<tbody>
						{/* 데이터가 없을 때 보여줄 내용 */}
						{data.length === 0 && (
							<tr>
								<td colSpan="7" className="empty-table-message">
									No Data
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export { AssetSurveyHistory };
