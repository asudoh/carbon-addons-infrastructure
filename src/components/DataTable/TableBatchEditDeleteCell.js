import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { DataTable } from 'carbon-components-react';

const { TableCell } = DataTable;

/**
 * `<Table>` supporting batch editing UI.
 */
const TableBatchEditDeleteCell = ({ children, className, ...other }) => {
  const classes = classnames(
    'infra--data-table--batch-edit-delete-cell',
    className
  );
  return (
    <TableCell {...other} className={classes}>
      {children}
    </TableCell>
  );
};

TableBatchEditDeleteCell.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default TableBatchEditDeleteCell;
