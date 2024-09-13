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
  //const isLoading = props['loading'] || false;

  const navigate = useNavigate();

  // 행 클릭 이벤트 핸들러
  const handleRowClick = (row) => {
    if (row.values.assetSurveyLocation === '') {
      //console.log('1');
      return;
    }

    //setSelectedRow(row);
    //setShowModal(true);
    console.log(row.values.assetSurveyLocation);
    const location = row.values.assetSurveyLocation;
    navigate('/jsx/AssetSurveyDetail', {
      state: {
        location: row.values.assetSurveyLocation,
        surveyStartDate: row.values.assetSurveyStartDate,
        surveyBy: row.values.assetSurveyBy,
        assetSurveyNo: row.values.assetSurveyNo,
      }
    });  // 클릭된 행의 location으로 페이지 이동
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
      initialState: { pageSize: props['pageSize'] || 10 },
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
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
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
            {isDataExist ? (
              // 데이터가 존재하지 않을 때는 오류 메시지 표시
              <tr>
                <td colSpan={6} className="text-center text-danger">
                  데이터를 불러오지 못했습니다.
                </td>
              </tr>
            ) : (
              // 데이터가 존재할 때는 각 행을 표시
              (rows || []).map((row, index) => {
                dataTable.prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps({
                      onClick: () => handleRowClick(row),
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
