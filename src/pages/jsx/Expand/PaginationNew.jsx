import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Pagination = ({ pageIndex, pageCount, gotoPage, pageSize, setPageSize, sizePerPageList }) => {
	const [visiblePages, setVisiblePages] = useState([]);

	const filterPages = useCallback((visiblePages, totalPages) => {
		return visiblePages.filter((page) => page <= totalPages);
	}, []);

	const getVisiblePages = useCallback(
		(page, total) => {
			if (total < 7) {
				return filterPages([1, 2, 3, 4, 5, 6], total);
			} else if (page > 4 && page + 2 < total) {
				return [1, page - 1, page, page + 1, total];
			} else if (page > 4 && page + 2 >= total) {
				return [1, total - 3, total - 2, total - 1, total];
			} else {
				return [1, 2, 3, 4, 5, total];
			}
		},
		[filterPages]
	);

	useEffect(() => {
		setVisiblePages(getVisiblePages(pageIndex + 1, pageCount));
	}, [pageCount, pageIndex, getVisiblePages]);

	const changePage = (page) => {
		if (page === pageIndex + 1) return; // 현재 페이지면 아무 동작 안함
		gotoPage(page - 1); // 페이지 변경 요청
	};

	return (
		<div className="d-lg-flex align-items-center text-center pb-1">
			{/* 페이지당 항목 수 선택 */}
			{sizePerPageList.length > 0 && (
				<div className="d-inline-block me-3">
					<label className="me-1">Display:</label>
					<select
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
						className="form-select d-inline-block w-auto"
					>
						{sizePerPageList.map((pageSize, index) => (
							<option key={index.toString()} value={pageSize.value}>
								{pageSize.text}
							</option>
						))}
					</select>
				</div>
			)}

			{/* 현재 페이지 및 총 페이지 수 표시 */}
			<span className="me-3">
				Page{' '}
				<strong>
					{pageIndex + 1} of {pageCount}
				</strong>
			</span>

			{/* 페이지 이동 */}
			<ul className="pagination pagination-rounded d-inline-flex ms-auto align-items-center mb-0">
				<li
					key="prevpage"
					className={classNames('page-item', 'paginate_button', 'previous', {
						disabled: pageIndex === 0,
					})}
					onClick={() => changePage(pageIndex)}
				>
					<Link to="" className="page-link">
						<i className="mdi mdi-chevron-left"></i>
					</Link>
				</li>

				{visiblePages.map((page, index, array) =>
					array[index - 1] + 1 < page ? (
						<React.Fragment key={page.toString()}>
							<li className="page-item disabled d-none d-xl-inline-block">
								<Link to="" className="page-link">
									...
								</Link>
							</li>
							<li
								className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
									active: pageIndex + 1 === page,
								})}
								onClick={() => changePage(page)}
							>
								<Link to="" className="page-link">
									{page}
								</Link>
							</li>
						</React.Fragment>
					) : (
						<li
							key={page.toString()}
							className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
								active: pageIndex + 1 === page,
							})}
							onClick={() => changePage(page)}
						>
							<Link to="" className="page-link">
								{page}
							</Link>
						</li>
					)
				)}

				<li
					key="nextpage"
					className={classNames('page-item', 'paginate_button', 'next', {
						disabled: pageIndex + 1 === pageCount,
					})}
					onClick={() => changePage(pageIndex + 2)}
				>
					<Link to="" className="page-link">
						<i className="mdi mdi-chevron-right"></i>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export { Pagination };
