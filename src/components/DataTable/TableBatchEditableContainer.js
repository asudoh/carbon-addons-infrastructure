import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { DataTable } from 'carbon-components-react';

const { TableContainer } = DataTable;

/**
 * `<TableContainer>` supporting batch editing UI.
 */
const TableBatchEditableContainer = ({
  children,
  className,
  editing,
  ...other
}) => {
  const classes = classnames('infra--data-table--batch-editable', className, {
    'infra--data-table--batch-editing': editing,
  });
  return (
    <TableContainer {...other} className={classes}>
      {children}
    </TableContainer>
  );
};

TableBatchEditableContainer.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * `true` if the table is being edited in batch.
   */
  editing: PropTypes.bool,
};

export default TableBatchEditableContainer;
