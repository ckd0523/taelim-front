import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = () => [
	{
		Header: '번호',
		accessor: 'UpdateNo',
		defaultCanSort: true,
		Cell: ({ row }) => {
			return <span>{row.index + 1}</span>;
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
