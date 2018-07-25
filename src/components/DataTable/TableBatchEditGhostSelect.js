import PropTypes from 'prop-types';
import React from 'react';
import GhostSelect from '../GhostSelect';
import InvalidIcon from './InvalidIcon';

/**
 * `<GhostSelect>` for table batch editing.
 */
const TableBatchEditGhostSelect = ({ children, invalidText, ...other }) => (
  <GhostSelect
    {...other}
    invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}>
    {children}
  </GhostSelect>
);

TableBatchEditGhostSelect.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default TableBatchEditGhostSelect;
