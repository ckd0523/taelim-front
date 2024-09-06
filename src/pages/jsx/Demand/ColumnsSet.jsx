import { Link } from 'react-router-dom';
import classNames from 'classnames';

/* order column render */
const OrderColumn = ({ row }) => {
	return (
		<Link to="" className="text-body fw-bold">
			{row.original.order_id}
		</Link>
	);
};

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
const columns = [
	{
		Header: '요청구분',
		accessor: 'demandType',
		defaultCanSort: true,
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
