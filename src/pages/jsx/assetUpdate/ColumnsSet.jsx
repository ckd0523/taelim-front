import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns 여긴 완료
const columns = [
	{
		Header: '번호',
		accessor: 'assetNo',
		defaultCanSort: true,
	},
	{
		Header: '자산기준',
		accessor: 'assetBasis',
		defaultCanSort: true,
	},
	{
		Header: '자산코드',
		accessor: 'assetCode',
		defaultCanSort: true,
	},
	{
		Header: '자산명',
		accessor: 'assetName',
		defaultCanSort: true,
	},
	{
		Header: '자산분류',
		accessor: 'assetClassification',
		defaultCanSort: true,
	},
	{
		Header: '목적/기능',
		accessor: 'purpose',
		defaultCanSort: true,
	},
	{
		Header: '자산위치',
		accessor: 'assetLocation',
		defaultCanSort: true,
	},
	{
		Header: '부서',
		accessor: 'department',
		defaultCanSort: true,
	},
	{
		Header: '사용자',
		accessor: 'assetUser',
		defaultCanSort: true,
	},
	{
		Header: '소유자',
		accessor: 'assetOwner',
		defaultCanSort: true,
	},
	{
		Header: 'Action', // 이 부분에서 baseColumns로부터 함수를 전달받아 사용
		accessor: 'action',
	},
];

export { columns };
