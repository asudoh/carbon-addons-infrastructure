import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { StructuredListRow as CarbonStructuredListRow } from 'carbon-components-react';

/**
 * `<StructuredListRow>` for `carbon-addons-infrastructure`.
 */
const StructuredListRow = ({ children, className, ...other }) => {
  const classes = classnames('infra--structured-list-row', className);
  return (
    <CarbonStructuredListRow {...other} className={classes}>
      {children}
    </CarbonStructuredListRow>
  );
};

StructuredListRow.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default StructuredListRow;
