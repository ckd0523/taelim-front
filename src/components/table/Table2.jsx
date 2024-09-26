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
import { Pagination } from './Pagination';
import { useNavigate } from 'react-router-dom';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchBoxClass,
}) => {
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

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
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
  }
);





const Table2 = (props) => {
  const isSearchable = props['isSearchable'] || false;
  const isSortable = props['isSortable'] || false;
  const pagination = props['pagination'] || false;
  const isSelectable = props['isSelectable'] || false;
  const isExpandable = props['isExpandable'] || false;
  const sizePerPageList = props['sizePerPageList'] || [];
  const isDataExist = props['isDataExist'] || false;
  const setSelectedRows = props['setSelectedRows'] || false;
  //const isLoading = props['loading'] || false;

  const navigate = useNavigate();

  // 행 클릭 이벤트 핸들러
  const handleRowClick = (row) => {
    //자산 조사의 위치가 없거나 자산 조사가 완료된 자산 조사는 클릭 안됨
    if (row.values.assetSurveyLocation === '' || row.values.surveyStatus === true) {
      //console.log('1');
      return;
    }

    //setSelectedRow(row);
    //setShowModal(true);
    console.log(row.values.assetSurveyLocation);
    //const location = row.values.assetSurveyLocation;
    navigate('/jsx/AssetSurveyDetail/', {
      state: {
        location: row.values.assetSurveyLocation,
        surveyStartDate: row.values.assetSurveyStartDate,
        surveyBy: row.values.assetSurveyBy,
        assetSurveyNo: row.values.assetSurveyNo,
      }
    });  // 클릭된 행의 location으로 페이지 이동
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
      //안보이게 할 컬럼을 여기 init에 적어주면 됨.
      initialState: { pageSize: props['pageSize'] || 10, hiddenColumns: ['assetSurveyNo'] },
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
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()}
                  /* disabled={dataTable.rows.some(row => row.original.surveyStatus === true)} */ />

              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                {row.original.surveyStatus !== true ? (
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                ) : null}
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
                {isAllRowsExpanded ? '-' : '+'}
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
                  {row.isExpanded ? '-' : '+'}
                </span>
              ) : null,
          },
          ...columns,
        ]);
    }
  );

  //자산 조사 이력에서 자산 조사 삭제할 때 체크 박스 동작
  const {
    selectedFlatRows,
    state: { selectedRowIds },
    // ...other destructured values
  } = dataTable;

  useEffect(() => {

    //전체 선택 시 완료된 자산 조사도 select가 됨
    const selectedRowsData = selectedFlatRows.map((row) => row.original);
    //그래서 surveyStatus가 false인 행들만 필터링
    const validSelectedRows = selectedRowsData.filter(row => row.surveyStatus === false);

    //console.log("선택된 행:", JSON.stringify(validSelectedRows, null, 2));

    // assetSurveyNo만 출력
    const assetSurveyNos = validSelectedRows.map(row => row.assetSurveyNo);
    //console.log("선택된 행에서 자산 조사 번호:", assetSurveyNos.join(', '));
    setSelectedRows(assetSurveyNos);
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
            {/* 데이터를 불러오지 못했을 때 */}
            {isDataExist ? (
              <tr>
                <td colSpan={6} className="text-center text-danger">
                  데이터를 불러오지 못했습니다.
                </td>
              </tr>
            ) :
              /* 데이터를 불러왔지만 빈 배열일 때 */
              (props.data && props.data.length === 0) ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    불러올 자산 조사가 없습니다. 자산 조사를 등록하세요.
                  </td>
                </tr>
              ) : (
                // 데이터가 존재할 때는 각 행을 표시
                rows.map((row, index) => {
                  dataTable.prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps({
                        onClick: (e) => handleCellClick(e, row),
                      })}
                      key={index}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })
              )}
          </tbody>

        </table>
      </div>


      {pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
    </>
  );
};

export { Table2 };
