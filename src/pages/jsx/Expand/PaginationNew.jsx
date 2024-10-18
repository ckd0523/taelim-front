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
			{/* 현재 페이지 및 총 페이지 수 표시 */}
			<span className="me-3">
				Page{' '}
				<strong>
					{pageIndex + 1} of {pageCount}
				</strong>
			</span>

			{/* 페이지당 항목 수 선택 */}
			<span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
				<label>Go to page : </label>
				<input
					type="number"
					value={pageIndex + 1}
					min="1"
					max={pageCount} // 최대 페이지 수를 설정
					onChange={(e) => {
						const page = e.target.value ? Number(e.target.value) - 1 : 0; // 입력된 값이 있을 때 페이지 번호를 계산
						if (page >= 0 && page < pageCount) {
							// 유효한 페이지인지 확인
							gotoPage(page); // 페이지 이동
						}
					}}
					className="form-control w-25 ms-1 d-inline-block"
				/>
			</span>

			{/* 페이지 이동 */}
			<ul className="pagination pagination-rounded d-inline-flex ms-auto align-items-center mb-0">
				<li
					key="prevpage"
					className={classNames('page-item', 'paginate_button', 'previous', {
						disabled: pageIndex === 0, // 첫 페이지일 경우 disabled
					})}
					onClick={() => {
						if (pageIndex > 0) changePage(pageIndex); // 현재 페이지가 첫 페이지가 아닐 때만 페이지 감소
					}}
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
						disabled: pageIndex + 1 === pageCount, // 최대 페이지에 도달했을 때 disabled
					})}
					onClick={() => {
						if (pageIndex + 1 < pageCount) {
							changePage(pageIndex + 2); // 현재 페이지가 마지막 페이지가 아닐 때만 페이지 이동
						}
					}}
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
