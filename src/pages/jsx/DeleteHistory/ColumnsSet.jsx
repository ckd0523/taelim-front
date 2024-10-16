import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = () => [
	{
		Header: '번호',
		accessor: 'DeleteNo',
		defaultCanSort: true,
		Cell: ({ row }) => {
			return <span>{row.index + 1}</span>;
		},
	},
	{
		Header: '자산코드',
		accessor: 'assetCode',
		defaultCanSort: true,
	},
	{
		Header: '자산명',
		accessor: 'assetName',
		defaultCanSort: false,
	},
	{
		Header: '폐기일자',
		accessor: 'deleteDate',
		defaultCanSort: false,
	},
	{
		Header: '폐기자',
		accessor: 'deleteBy',
		defaultCanSort: false,
	},
	{
		Header: '폐기사유',
		accessor: 'deleteReason',
		defaultCanSort: false,
	},
	{
		Header: '폐기방법',
		accessor: 'deleteMethod',
		defaultCanSort: false,
	},
	{
		Header: '폐기위치',
		accessor: 'deleteLocation',
		defaultCanSort: false,
	},
];

export { columns };
