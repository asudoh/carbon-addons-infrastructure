import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'carbon-components-react';

import {
  setEditMode,
  cancelEdit,
  addRule,
  deleteRule,
  saveData,
  changeCell,
} from './actions';

const Container = connect(
  state => state,
  dispatch => ({
    ...bindActionCreators(
      {
        onCancelEdit: cancelEdit,
        onAddRule: addRule,
        onRequestSave: saveData,
      },
      dispatch
    ),

    onSetEditMode: () => {
      dispatch(setEditMode(true));
    },

    onDeleteRule: evt => {
      dispatch(deleteRule((evt.currentTarget.dataset.id || '').split(':')[0]));
    },

    onChangeCell: evt => {
      const { dataset, value } = evt.target;
      const { id, field } = dataset;
      const rowId = (id || '').split(':')[0];
      dispatch(changeCell(rowId, field, value));
    },
  })
)(props => {
  const { render, rows, ...other } = props;
  const renderContents = renderProps => {
    const {
      rowDataIds,
      editing,
      saving,
      saved,
      onSetEditMode,
      onCancelEdit,
      onAddRule,
      onDeleteRule,
      onRequestSave,
      onChangeCell,
    } = props;
    return render({
      ...renderProps,
      rowDataIds,
      editing,
      saving,
      saved,
      onSetEditMode,
      onCancelEdit,
      onRequestSave,
      onAddRule,
      onDeleteRule,
      onChangeCell,
    });
  };
  return <DataTable {...other} rows={rows} render={renderContents} />;
});

export default Container;
