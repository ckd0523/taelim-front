import { Row, Col, Card } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { Table } from '@/components/table';
import { records as data } from './data';
import 'regenerator-runtime';
const columns = [
	{
		Header: 'ID',
		accessor: 'id',
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
		defaultCanSort: false,
	},
	{
		Header: '자산명',
		accessor: 'assetName',
		defaultCanSort: true,
	},
	{
		Header: '자산분류',
		accessor: 'assetCategories',
		defaultCanSort: false,
	},
	{
		Header: '목적/기능',
		accessor: 'purpose',
		defaultCanSort: false,
	},
	{
		Header: '자산위치',
		accessor: 'assetLocation',
		defaultCanSort: false,
	},
	{
		Header: '부서',
		accessor: 'department',
		defaultCanSort: false,
	},
	{
		Header: '사용자',
		accessor: 'assetUser',
		defaultCanSort: false,
	},
	{
		Header: '소유자',
		accessor: 'assetOwner',
		defaultCanSort: false,
	},
];

const sizePerPageList = [
	{
		text: '5',
		value: 5,
	},
	{
		text: '10',
		value: 10,
	},
	{
		text: '25',
		value: 25,
	},
	{
		text: 'All',
		value: data.length,
	},
];

const ExcelRegister = () => {
	return (
		<>
			<PageBreadcrumb title="엑셀등록" subName="자산등록" />

			<Row>
				<Col>
					<Card>
						<Card.Body>
							<h4 className="header-title">EXCEL DATA</h4>
							{/* <p className="text-muted font-14 mb-4">
                A simple example of table with pagination and column sorting
              </p> */}

							<Table
								columns={columns}
								data={data}
								pageSize={5}
								sizePerPageList={sizePerPageList}
								isSortable={true}
								pagination={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ExcelRegister;
