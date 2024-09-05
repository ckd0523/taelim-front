// PaginationControls.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import classNames from 'classnames';

const PaginationControls = ({
	pageSize,
	setPageSize,
	pageIndex,
	setPageIndex,
	canPreviousPage,
	canNextPage,
	pageOptions,
	gotoPage,
	previousPage,
	nextPage,
	pageCount,
}) => {
	const handlePageSizeChange = (e) => {
		setPageSize(Number(e.target.value));
		setPageIndex(0); // 페이지 크기 변경 시 첫 페이지로 리셋
	};

	return (
		<div className="d-flex justify-content-between mt-3">
			<div>
				<Form.Label className="me-2">Display:</Form.Label>
				<Form.Select
					value={pageSize}
					onChange={handlePageSizeChange}
					className="d-inline-block w-auto"
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value="All">All</option>
				</Form.Select>
			</div>

			<div>
				<Button variant="secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</Button>
				<Button
					variant="secondary"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{'<'}
				</Button>
				{pageOptions.map((pageNum) => (
					<Button
						key={pageNum}
						variant="secondary"
						className={classNames('mx-1', {
							'bg-primary text-white': pageNum === pageIndex,
						})}
						onClick={() => setPageIndex(pageNum)}
					>
						{pageNum + 1}
					</Button>
				))}
				<Button variant="secondary" onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</Button>
				<Button
					variant="secondary"
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{'>>'}
				</Button>
			</div>
		</div>
	);
};

export default PaginationControls;
