import PropTypes from 'prop-types';
import React from 'react';
import { Tooltip } from 'carbon-components-react';
import { iconErrorSolid } from 'carbon-icons';

/**
 * The form validation UI specific to table batch editing.
 */
const InvalidIcon = ({ children, ...other }) => (
  <Tooltip icon={iconErrorSolid} triggerText={null} {...other}>
    {children}
  </Tooltip>
);

InvalidIcon.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default InvalidIcon;
