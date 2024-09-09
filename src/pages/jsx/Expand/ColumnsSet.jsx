import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = [
	{
		Header: '번호',
		accessor: 'UpdateNo',
		defaultCanSort: true,
	},
	{
		Header: '자산코드',
		accessor: 'AssetCode',
		defaultCanSort: true,
	},
	{
		Header: '자산명',
		accessor: 'AssetName',
		defaultCanSort: true,
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
		defaultCanSort: true,
	},
];

export { columns };
