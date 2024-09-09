import classNames from 'classnames';

/* status column render */
const StatusColumn = ({ row }) => {
  return (
    <h5>
      <span
        className={classNames('badge', {
          'badge-success-lighten': row.value === true,
          'badge-danger-lighten': row.value === false,
        })}
      >
        {({ value }) => (value ? '완료' : '진행 중')}
      </span>
    </h5>
  );
};

export default StatusColumn;