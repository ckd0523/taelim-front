import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
//import axios from "axios";

const BackUpHistory = () => {
	const tableRef = useRef(null);
	const dataTableRef = useRef(null);
	const [data, setData] = useState(['']);

	//검색을 위한 useState
	const [backUpNo, setBackUpNo] = useState('');
	const [backUpDate, setBackUpDate] = useState('');
	const [backUpScope, setackUpScope] = useState('');

	useEffect(() => {
		// 백엔드에서 데이터를 가져오는 API 호출
		fetch('http://localhost:8080/backUpHistory')
			.then((response) => response.json())
			.then((data) => {
				// 데이터 상태 업데이트
				setData(data);
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	useEffect(() => {
		// 데이터가 있을 때만 DataTables 초기화 또는 갱신
		if (data.length > 0) {
			if (!dataTableRef.current) {
				dataTableRef.current = $(tableRef.current).DataTable({
					data: data.map((item) => [item.backUpNo, item.backUpDate, item.backUpScope]),
					columns: [
						{ title: '백업 번호' },
						{ title: '백업 날짜' },
						{ title: '백업 범위' },
					],
				});
			} else {
				// 기존 테이블 데이터를 업데이트합니다.
				dataTableRef.current
					.clear()
					.rows.add(
						data.map((item) => [
							item.name,
							item.position,
							item.office,
							item.age,
							item.startDate,
							item.salary,
						])
					)
					.draw();
			}
		}

		return () => {
			// 컴포넌트 언마운트 시 DataTable 제거
			if (dataTableRef.current) {
				dataTableRef.current.destroy(true);
				dataTableRef.current = null;
			}
		};
	}, [data]);

	return (
		<div>
			<div>
				<table ref={tableRef} className="display" style={{ width: '100%' }}></table>
			</div>

		</div>
	);
};

export { BackUpHistory };
