import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

/* status column render */
const StatusColumn = ({ row }) => {
	return (
		<h5>
			<span
				className={classNames('badge', {
					'badge-success-lighten': row.original.demandStatus === 'UNCONFIRMED',
					'badge-danger-lighten': row.original.demandStatus === 'Processing',
					'badge-info-lighten': row.original.demandStatus === 'APPROVE',
					'badge-warning-lighten': row.original.demandStatus === 'REFUSAL',
				})}
			>
				{row.original.demandStatus}
			</span>
		</h5>
	);
};

// get all columns
const columns = (setModalData, setShowModal) => [
	{
		Header: '요청번호',
		accessor: 'demandNo',
	},
	{
		Header: '요청구분',
		accessor: 'demandType',
		defaultCanSort: true,
		Cell: ({ row }) => {
			const handleRowClick = useCallback(() => {
				setModalData(row.original);
				console.log(row.original);
				setShowModal(true);
			}, [row.original]);

			return (
				<span onClick={handleRowClick} style={{ cursor: 'pointer', color: 'blue' }}>
					{row.original.demandType}
				</span>
			);
		},
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
		Header: 'Status',
		accessor: 'demandStatus',
		defaultCanSort: false,
		Cell: StatusColumn,
	},
];

export { columns };
