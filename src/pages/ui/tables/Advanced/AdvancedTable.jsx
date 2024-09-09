import { Row, Col, Card } from 'react-bootstrap';
import { Table, PageBreadcrumb } from '@/components';
import { records as data, expandableRecords } from './data';

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    defaultCanSort: true,
  },
  {
    Header: 'Name',
    accessor: 'name',
    defaultCanSort: true,
  },
  {
    Header: 'Phone Number',
    accessor: 'phone',
    defaultCanSort: false,
  },
  {
    Header: 'Age',
    accessor: 'age',
    defaultCanSort: true,
  },
  {
    Header: 'Company',
    accessor: 'company',
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

const AdvancedTable = () => {
  return (
    <>
      <PageBreadcrumb title="Advanced" subName="Tables" />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Pagination &amp; Sort</h4>
              <p className="text-muted font-14 mb-4">
                A simple example of table with pagination and column sorting
              </p>

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

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Search</h4>
              <p className="text-muted font-14 mb-4">A Table allowing search</p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Multiple Row Selection</h4>
              <p className="text-muted font-14 mb-4">
                This table allowing selection of multiple rows
              </p>

              <Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title">Expand Row</h4>
              <p className="text-muted font-14 mb-4">
                Expand row to see more additional details
              </p>

              <Table
                columns={columns}
                data={expandableRecords}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isExpandable={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export { AdvancedTable };
