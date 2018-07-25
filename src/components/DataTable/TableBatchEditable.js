import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { DataTable } from 'carbon-components-react';

const { Table } = DataTable;

/**
 * `<Table>` supporting batch editing UI.
 */
const TableBatchEditable = ({ children, className, saving, ...other }) => {
  const classes = classnames('infra--data-table--batch-editable', className, {
    'infra--data-table--batch-saving': saving,
  });
  return (
    <Table {...other} className={classes}>
      {children}
    </Table>
  );
};

TableBatchEditable.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * `true` if the table data is being saved in batch.
   */
  saving: PropTypes.bool,
};

export default TableBatchEditable;
