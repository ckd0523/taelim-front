import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = (handleRowClick) => [
	{
		Header: '번호',
		accessor: 'UpdateNo',
		Cell: ({ row }) => (
			<span
				onClick={() => handleRowClick(row.original.UpdateNo)}
				style={{ cursor: 'pointer', color: 'blue' }}
			>
				{row.original.UpdateNo}
			</span>
		),
	},
	{
		Header: '자산코드',
		accessor: 'AssetCode',
	},
	{
		Header: '자산명',
		accessor: 'AssetName',
	},
	{
		Header: '수정일자',
		accessor: 'UpdateDate',
	},
	{
		Header: '수정요청자',
		accessor: 'UpdateBy',
	},
	{
		Header: '수정사유',
		accessor: 'UpdateReason',
	},
];

export { columns };
