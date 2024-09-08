import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback } from 'react';

// get all columns
const columns = (setModalData, setShowModal) => [
	{
		Header: '번호',
		accessor: 'DeleteNo',
		defaultCanSort: true,
		Cell: ({ row }) => {
			const handleRowClick = useCallback(() => {
				setModalData(row.original);
				setShowModal(true);
			}, [row.original]);

			return (
				<span onClick={handleRowClick} style={{ cursor: 'pointer', color: 'blue' }}>
					{row.original.DeleteNo}
				</span>
			);
		},
	},
	{
		Header: '자산코드',
		accessor: 'AssetCode',
		defaultCanSort: true,
	},
	{
		Header: '자산명',
		accessor: 'AssetName',
		defaultCanSort: false,
	},
	{
		Header: '폐기일자',
		accessor: 'DeleteDate',
		defaultCanSort: false,
	},
	{
		Header: '폐기자',
		accessor: 'DeleteBy',
		defaultCanSort: false,
	},
	{
		Header: '폐기사유',
		accessor: 'DeleteReason',
		defaultCanSort: false,
	},
	{
		Header: '폐기방법',
		accessor: 'DeleteMethod',
		defaultCanSort: false,
	},
	{
		Header: '폐기위치',
		accessor: 'DeleteLocation',
		defaultCanSort: false,
	},
];

export { columns };
