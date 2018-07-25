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
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  iconDescription: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  light: PropTypes.bool,
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
