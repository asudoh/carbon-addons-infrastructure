import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Icon } from 'carbon-components-react';

const GhostSelect = ({
  className,
  id,
  inline,
  labelText,
  disabled,
  children,
  iconDescription,
  hideLabel,
  invalid,
  invalidText,
  light,
  overlay,
  ...other
}) => {
  const selectClasses = classNames({
    'bx--select': true,
    'bx-select--inline': inline,
    'bx--select--light': light,
    [className]: className,
  });
  const labelClasses = classNames('bx--label', {
    'bx--visually-hidden': hideLabel,
  });
  const errorId = `${id}-error-msg`;
  const error = invalid ? (
    <div className="bx--form-requirement" id={errorId}>
      {invalidText}
    </div>
  ) : null;
  return (
    <div className="bx--form-item">
      <div data-invalid={invalid || undefined} className={selectClasses}>
        {overlay && (
          <div className="infra--ghost-select-overlay">{overlay}</div>
        )}
        <select
          {...other}
          id={id}
          className="bx--select-input"
          disabled={disabled}
          data-invalid={invalid || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={errorId}>
          {children}
        </select>
        <Icon
          name="caret--down"
          className="bx--select__arrow"
          description={iconDescription}
        />
        <label htmlFor={id} className={labelClasses}>
          {labelText}
        </label>
        {error}
      </div>
    </div>
  );
};

GhostSelect.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The element ID for `<select>`.
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to use the inline mode style.
   */
  inline: PropTypes.bool,

  /**
   * The label text.
   */
  labelText: PropTypes.node,

  /**
   * An event handler for change in selection.
   */
  onChange: PropTypes.func,

  /**
   * `true` to show the disabled UI.
   */
  disabled: PropTypes.bool,

  /**
   * The initial value.
   */
  defaultValue: PropTypes.any,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string.isRequired,

  /**
   * `true` to hide the `<label>`.
   */
  hideLabel: PropTypes.bool,

  /**
   * `true` to use the light mode style.
   */
  light: PropTypes.bool,

  /**
   * The UI to replace the UI showing the selected item with.
   */
  overlay: PropTypes.node,
};

GhostSelect.defaultProps = {
  disabled: false,
  labelText: 'Select',
  inline: false,
  iconDescription: 'open list of options',
  light: false,
};

export default GhostSelect;
