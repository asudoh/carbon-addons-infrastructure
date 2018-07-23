import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Icon } from 'carbon-components-react';

/**
 * Simple button with an icon.
 */
const ToolbarAction = ({ className, icon, iconDescription, ...other }) => {
  const classes = classnames('bx--toolbar-action', className);
  return (
    <button {...other} className={classes}>
      <Icon
        className="bx--toolbar-action__icon"
        icon={icon}
        description={iconDescription}
      />
    </button>
  );
};

ToolbarAction.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The icon data.
   */
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }).isRequired,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,
};

export default ToolbarAction;
