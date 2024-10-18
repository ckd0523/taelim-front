import SearchBar from './AssetSurveyHistorySearchBar';
import { SurveyTable } from './AssetSurveyHistoryTable';
import { Buttons } from './AssetSurveyButtons';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
const URL = import.meta.env.VITE_BASIC_URL;

const AssetSurveyHistory2 = () => {
	//다른 페이지에서 이 페이지로 넘어올 때 스크롤을 최상단으로
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//자산 조사 삭제를 위해 어떤 행이 선택되었는지
	const [selectedRows, setSelectedRows] = useState([]);

	//등록 후 테이블 리렌더링
	const [tableChange, setTableChange] = useState(0);

	const onClickRegister = () => {
		if (tableChange === 2) {
			setTableChange(0);
		}
		setTableChange(tableChange + 1);
	};

	// 행 삭제 함수
	const handleDelete = async () => {
		if (selectedRows.length === 0) {
			Swal.fire({
				icon: 'error',
				text: '한 개 이상의 자산 조사를 선택하세요.',
			});
			return;
		}

		try {
			const response = await fetch(`${URL}/deleteAssetSurvey`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ assetSurveyNo: selectedRows }), // 데이터를 JSON 형식으로 변환하여 보냄
			});

			if (!response.ok) {
				throw new Error('자산 조사 삭제에 실패했습니다.');
			}

			Swal.fire({
				icon: 'success',
				title: '자산 조사 삭제가 완료되었습니다.',
				text: '자산조사 페이지로 이동합니다.',
			});

			//삭제 성공 후 선택된 행 초기화
			setSelectedRows([]);
			//삭제 성공 후 테이블 리렌더링
			onClickRegister();
		} catch (error) {
			console.error('자산 조사 삭제 중 오류:', error);

			Swal.fire({
				icon: 'error',
				title: '오류가 발생했습니다. 다시 시도해주세요.',
			});
		}

		//console.log("삭제요~");
		//console.log(selectedRows);
	};

	//검색 버튼과 테이블이 같은 레벨에 있기 때문에
	//최상위 컴포넌트에 필터될 데이터인 data, 원본 데이터인 originalData를 useState로 만들어서
	//검색 바에 데이터를 넘겨줌
	const [data, setData] = useState([]);
	const [originalData, setOriginalData] = useState([]);

	return (
		<div>
			<Card></Card>
			{/* 검색 바 */}
			<SearchBar setData={setData} originalData={originalData} />
			{/* 각종 버튼 */}
			<Buttons onClickRegister={onClickRegister} onDelete={handleDelete} />
			{/* 자산 조사 이력 테이블 */}
			<SurveyTable
				tableChange={tableChange}
				setSelectedRows={setSelectedRows}
				data={data}
				setData={setData}
				setOriginalData={setOriginalData}
			/>
		</div>
	);
};

export { AssetSurveyHistory2 };
