import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { TextInput } from 'carbon-components-react';
import InvalidIcon from './InvalidIcon';

/**
 * `<TextInput>` for table batch editing.
 */
const TableBatchEditTextInput = ({ className, invalidText, ...other }) => {
  const classes = classnames(
    'infra--data-table--batch-edit__text-input',
    className
  );
  return (
    <TextInput
      {...other}
      className={classes}
      labelText=""
      invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}
    />
  );
};

TableBatchEditTextInput.propTypes = {
  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default TableBatchEditTextInput;
