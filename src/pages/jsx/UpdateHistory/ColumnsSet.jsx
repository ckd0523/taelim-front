import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = (setModalData, setShowModal) => [
	{
		Header: '번호',
		accessor: 'UpdateNo',
		defaultCanSort: true,
		Cell: ({ row }) => {
			const handleRowClick = useCallback(() => {
				setModalData(row.original);
				setShowModal(true);
			}, [row.original]);

			return (
				<span onClick={handleRowClick} style={{ cursor: 'pointer', color: 'blue' }}>
					{row.original.UpdateNo}
				</span>
			);
		},
	},
	{
		Header: '자산코드',
		accessor: 'AssetCode',
		defaultCanSort: false,
	},
	{
		Header: '자산명',
		accessor: 'AssetName',
		defaultCanSort: false,
	},
	{
		Header: '수정일자',
		accessor: 'UpdateDate',
		defaultCanSort: true,
	},
	{
		Header: '수정요청자',
		accessor: 'UpdateBy',
		defaultCanSort: true,
	},
	{
		Header: '수정사유',
		accessor: 'UpdateReason',
		defaultCanSort: false,
	},
];

export { columns };
