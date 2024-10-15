import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

/* status column render */
const StatusColumn = ({ row }) => {
	return (
		<h5>
			<span
				className={classNames('badge', {
					'badge-danger-lighten': row.original.demandStatus === 'UNCONFIRMED',
					'badge-success-lighten': row.original.demandStatus === 'completed',
					'badge-info-lighten': row.original.demandStatus === 'APPROVE',
					'badge-warning-lighten': row.original.demandStatus === 'REFUSAL',
				})}
			>
				{getStatusText(row.original.demandStatus)}
			</span>
		</h5>
	);
};

const demandTypeColumn = ({ row }) => {
	return <span>{getDemandTypeText(row.original.demandType)}</span>;
};

const getDemandTypeText = (demandType) => {
	switch (demandType) {
		case 'update':
			return '수정요청';
		case 'delete':
			return '폐기요청';
		default:
			return demandType; // 상태가 정의되지 않은 경우 원래의 상태를 반환
	}
};

const getStatusText = (status) => {
	switch (status) {
		case 'UNCONFIRMED':
			return '미처리';
		case 'completed':
			return '완료';
		case 'APPROVE':
			return '승인';
		case 'REFUSAL':
			return '거절';
		default:
			return status; // 상태가 정의되지 않은 경우 원래의 상태를 반환
	}
};

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
		Header: '요청번호',
		accessor: 'demandNo',
	},
	{
		Header: '요청구분',
		accessor: 'demandType',
		defaultCanSort: true,
		Cell: demandTypeColumn,
	},
	{
		Header: '요청일자',
		accessor: 'demandDate',
		defaultCanSort: true,
	},
	{
		Header: '요청자',
		accessor: 'demandBy',
		defaultCanSort: false,
	},
	{
		Header: '처리상태',
		accessor: 'demandStatus',
		defaultCanSort: false,
		Cell: StatusColumn,
	},
];

export { columns };
