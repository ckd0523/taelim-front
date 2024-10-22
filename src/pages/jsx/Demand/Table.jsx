import React, { useRef, useEffect, forwardRef, useState } from 'react';
import {
	useTable,
	useSortBy,
	usePagination,
	useRowSelect,
	useGlobalFilter,
	useAsyncDebounce,
	useExpanded,
} from 'react-table';
import classNames from 'classnames';
import { Pagination } from '@/components';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<div className={classNames(searchBoxClass)}>
			<span className="d-flex align-items-center">
				Search :
				<input
					value={value || ''}
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder={`${count} records...`}
					className="form-control w-auto ms-1"
				/>
			</span>
		</div>
	);
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<div className="form-check">
			<input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
			<label htmlFor="form-check-input" className="form-check-label"></label>
		</div>
	);
});

const Table = (props) => {
	const isSearchable = props['isSearchable'] || false;
	const isSortable = props['isSortable'] || false;
	const pagination = props['pagination'] || false;
	const isSelectable = props['isSelectable'] || false;
	const isExpandable = props['isExpandable'] || false;
	const sizePerPageList = props['sizePerPageList'] || [];
	const hiddenColumns = props.initialState?.hiddenColumns || [];
	const setRowSelect = props['setRowSelect'] || [];
	const setModalData = props['setModalData']; // 개별적으로 받음
	const setShowModal = props['setShowModal']; // 개별적으로 받음

	const handleRowClick = (row) => {
		//자산 조사의 위치가 없으면 row 클릭 안됨
		//얘가 없으면 테이블이 계속 리렌더링이 되어버려서 이상한 문제들이 자꾸 생김
		if (row === undefined) {
			//console.log('1');
			return;
		}
		//setSelectedRow(row);
		//setShowModal(true);

		//console.log(row.values.assetSurveyLocation);
		console.log(row);
		setModalData(row.original);
		setShowModal(true);
	};

	//onClick을 row 전체에 걸어버리면 checkbox를 선택했을 때 row를 선택한 것으로 인식해서 문제가 생김
	const handleCellClick = (event, row) => {
		// 첫 번째 컬럼이 클릭되었는지 확인
		const clickedCell = event.target.closest('td');
		const cells = Array.from(clickedCell.parentNode.children);
		const cellIndex = cells.indexOf(clickedCell);

		// 첫 번째 컬럼(0번 index)이 아닌 경우에만 handleRowClick 호출
		if (cellIndex !== 0) {
			handleRowClick(row);
		}
	};

	let otherProps = {};

	if (isSearchable) {
		otherProps['useGlobalFilter'] = useGlobalFilter;
	}
	if (isSortable) {
		otherProps['useSortBy'] = useSortBy;
	}
	if (isExpandable) {
		otherProps['useExpanded'] = useExpanded;
	}
	if (pagination) {
		otherProps['usePagination'] = usePagination;
	}
	if (isSelectable) {
		otherProps['useRowSelect'] = useRowSelect;
	}

	const dataTable = useTable(
		{
			columns: props.columns,
			data: props['data'],
			initialState: {
				pageSize: props['pageSize'] || 10,
				hiddenColumns: hiddenColumns, // 숨길 열 설정
			},
			//selectedFlatRows,
			//selectedRowIds,
		},
		otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
		otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
		otherProps.hasOwnProperty('useExpanded') && otherProps['useExpanded'],
		otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
		otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],

		(hooks) => {
			isSelectable &&
				hooks.visibleColumns.push((columns) => [
					// Let's make a column for selection
					{
						id: 'selection',
						// The header can use the table's getToggleAllRowsSelectedProps method
						// to render a checkbox
						Header: ({ getToggleAllPageRowsSelectedProps }) => (
							<div>
								{/* <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} /> */}
							</div>
						),
						// The cell can use the individual row's getToggleRowSelectedProps method
						// to the render a checkbox
						Cell: ({ row }) => (
							<div
								style={{
									paddingLeft: `${row.depth * 2}rem`,
								}}
							>
								{row.original.demandStatus === 'UNCONFIRMED' ? (
									<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
								) : (
									<div></div> // 선택할 수 없는 경우에 대한 대체 내용
								)}
							</div>
						),
					},
					...columns,
				]);

			isExpandable &&
				hooks.visibleColumns.push((columns) => [
					// Let's make a column for selection
					{
						// Build our expander column
						id: 'expander', // Make sure it has an ID
						Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
							<span {...getToggleAllRowsExpandedProps()}>
								{isAllRowsExpanded ? (
									<i className={`ri-arrow-up-s-fill`} />
								) : (
									<i className={`ri-arrow-down-s-fill`} />
								)}
							</span>
						),
						Cell: ({ row }) =>
							// Use the row.canExpand and row.getToggleRowExpandedProps prop getter
							// to build the toggle for expanding a row
							row.canExpand ? (
								<span
									{...row.getToggleRowExpandedProps({
										style: {
											// We can even use the row.depth property
											// and paddingLeft to indicate the depth
											// of the row
											paddingLeft: `${row.depth * 2}rem`,
										},
									})}
								>
									{row.isExpanded ? (
										<i className={`ri-arrow-up-s-fill`} />
									) : (
										<i className={`ri-arrow-down-s-fill`} />
									)}
								</span>
							) : null,
					},
					...columns,
				]);
		}
	);

	const {
		selectedFlatRows,
		state: { selectedRowIds },
		// ...other destructured values
	} = dataTable;

	useEffect(() => {
		console.log('Selected row IDs:', selectedRowIds);
		console.log(
			'selectedFlatRows[].original',
			selectedFlatRows.map((d) => d.original)
		);
		const Rows = selectedFlatRows.map((d) => d.original);
		setRowSelect(Rows);
	}, [selectedRowIds]);

	const rows = pagination ? dataTable.page : dataTable.rows;

	return (
		<>
			{isSearchable && (
				<GlobalFilter
					preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
					globalFilter={dataTable.state.globalFilter}
					setGlobalFilter={dataTable.setGlobalFilter}
					searchBoxClass={props['searchBoxClass']}
				/>
			)}

			<div className="table-responsive">
				<table
					{...dataTable.getTableProps()}
					className={classNames('table table-centered react-table', props['tableClass'])}
				>
					<thead className={props['theadClass']}>
						{dataTable.headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column, index) => (
									<th
										{...column.getHeaderProps(
											column.defaultCanSort && column.getSortByToggleProps()
										)}
										className={classNames({
											sorting_desc: column.isSortedDesc === true,
											sorting_asc: column.isSortedDesc === false,
											sortable: column.defaultCanSort === true,
										})}
										key={index}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...dataTable.getTableBodyProps()}>
						{rows.map((row, index) => {
							dataTable.prepareRow(row); // 각 행에 대해 한 번만 호출
							return (
								<React.Fragment key={row.id}>
									<tr
										{...row.getRowProps({
											onClick: (e) => handleCellClick(e, row),
										})}
										style={{
											backgroundColor:
												row.depth === 1 ? '#f0f8ff' : 'transparent', // 상위 요소일 때 색상 설정
										}}
									>
										{row.cells.map((cell) => (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										))}
									</tr>
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>

			{pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
		</>
	);
};

export { Table };
