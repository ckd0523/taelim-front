import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = (setModalData, setShowModal, setAssetCode) => [
	{
		Header: '번호',
		accessor: 'UpdateNo',
		defaultCanSort: true,
		Cell: ({ row }) => {
			const handleRowClick = useCallback(() => {
				console.log('클릭된 행 : ', row.original); // row.original의 구조 확인
				console.log('assetCode: ', row.original.assetCode); // assetCode 값이 존재하는지 확인

				setModalData(row.original);
				setAssetCode(row.original.assetCode); // assetCode 설정
				setShowModal(true);
			}, [row.original]);

			return (
				<span onClick={handleRowClick} style={{ cursor: 'pointer', color: 'blue' }}>
					{row.index + 1}
				</span>
			);
		},
	},
	{
		Header: '자산코드',
		accessor: 'assetCode',
		defaultCanSort: false,
	},
	{
		Header: '자산명',
		accessor: 'assetName',
		defaultCanSort: false,
	},
	{
		Header: '수정일자',
		accessor: 'updateDate',
		defaultCanSort: true,
	},
	{
		Header: '수정요청자',
		accessor: 'updateBy',
		defaultCanSort: true,
	},
	{
		Header: '수정사유',
		accessor: 'updateReason',
		defaultCanSort: false,
	},
];

export { columns };
