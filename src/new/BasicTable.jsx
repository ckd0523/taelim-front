import { Link } from 'react-router-dom';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { records } from './data';

const BorderedTable = () => {
	return (
		<Card>
			<Card.Body>
				<h4 className="header-title">Bordered table</h4>
				<p className="text-muted font-14">
					Add <code>bordered</code> attribute for borders on all sides of the table and
					cells.
				</p>

				<Table className="mb-0" bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{records.map((record, index) => {
							return (
								<tr key={index.toString()}>
									<th scope="row">{record.id}</th>
									<td>{record.firstName}</td>
									<td>{record.lastName}</td>
									<td>{record.username}</td>
									<td className="table-action text-center">
										<Link to="" className="action-icon">
											<i className="mdi mdi-delete"></i>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};



const BasicTable = () => {
	return (
		<>

				<Col xl={12}>
					<BorderedTable />
				</Col>

		</>
	);
};

export { BasicTable };
