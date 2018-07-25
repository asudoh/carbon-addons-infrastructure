import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { DataTable } from 'carbon-components-react';

const { TableHeader } = DataTable;

/**
 * `<Table>` supporting batch editing UI.
 */
const TableBatchEditDeleteHeader = ({ children, className, ...other }) => {
  const classes = classnames(
    'infra--data-table--batch-edit-delete-cell',
    className
  );
  return (
    <TableHeader {...other} className={classes}>
      {children}
    </TableHeader>
  );
};

TableBatchEditDeleteHeader.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default TableBatchEditDeleteHeader;
