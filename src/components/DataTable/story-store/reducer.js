import {
  SET_EDIT_MODE,
  CANCEL_EDIT,
  ADD_RULE,
  DELETE_RULE,
  SET_REQUEST_SAVE_IN_PROGRESS,
  SET_REQUEST_SAVE_COMPLETE,
  UPDATE_PROTOCOL,
  UPDATE_ENDPOINT_GROUP_TYPE,
  UPDATE_ENDPOINT_GROUP_VALUE,
  UPDATE_PORT_TYPE,
  UPDATE_PORT_FROM,
  UPDATE_PORT_TO,
} from './actions';

const generateRowId = () =>
  `__infra_example__rule_edit_table__row__${Math.random()
    .toString(36)
    .substr(2)}`;

const updateRowDataIds = (rowDataIds, oldRowId, rowId) => {
  const rowDataId = rowDataIds[oldRowId];
  return Object.keys(rowDataIds).reduce(
    (o, key) =>
      key === oldRowId
        ? o
        : {
            ...o,
            [key]: rowDataIds[key],
          },
    { [rowId]: rowDataId }
  );
};

const endpointGroupValueInvalidText = {
  ip_address: 'Wrong IP address',
  cidr_block: 'Wrong CIDR block',
};

const endpointGroupValueValidators = {
  ip_address: value => {
    if (!value) {
      return false;
    }
    const parts = value.split('.');
    if (parts.length !== 4) {
      return true;
    }
    return parts.some(part => {
      const value = Number(part);
      return !part || isNaN(value) || value < 0 || value > 256;
    });
  },
  cidr_block: value => {
    if (!value) {
      return false;
    }
    const parts = value.split('/');
    if (parts.length !== 2) {
      return true;
    }
    const mask = Number(parts[1]);
    return (
      !parts[1] ||
      isNaN(mask) ||
      mask < 0 ||
      mask > 32 ||
      endpointGroupValueValidators['ip_address'](parts[0])
    );
  },
};

const reducer = (state = {}, action) => {
  const { rows: oldRows, rowDataIds: oldRowDataIds } = state;
  const { rowId: oldRowId, value } = action;
  const rowId = generateRowId();
  switch (action.type) {
    case SET_EDIT_MODE:
      return action.editMode
        ? {
            ...state,
            editing: true,
            saving: false,
            saved: false,
          }
        : {
            ...state,
            editing: false,
          };
    case CANCEL_EDIT:
      return {
        ...state,
        editing: false,
        rows: state.savedRows,
      };
    case ADD_RULE: {
      const newId = `__infra_example__rule_edit_table__row__${Math.random()
        .toString(36)
        .substr(2)}`;
      return {
        ...state,
        rowDataIds: {
          ...oldRowDataIds,
          [newId]: newId,
        },
        rows: oldRows.concat({
          id: newId,
          protocol: 'all',
          source: {
            type: 'any',
          },
          value: {
            type: 'any',
          },
        }),
      };
    }
    case DELETE_RULE:
      return {
        ...state,
        rowDataIds: Object.keys(oldRowDataIds).reduce(
          (o, key) =>
            key === oldRowId
              ? o
              : {
                  ...o,
                  [key]: oldRowDataIds[key],
                },
          {}
        ),
        rows: oldRows.filter(oldRow => oldRowId !== oldRow.id),
      };
    case SET_REQUEST_SAVE_IN_PROGRESS:
      return {
        ...state,
        saving: action.isInProgress,
      };
    case SET_REQUEST_SAVE_COMPLETE:
      return {
        ...state,
        saved: true,
        savedRows: oldRows,
      };
    case UPDATE_PROTOCOL:
      return {
        ...state,
        rowDataIds: updateRowDataIds(oldRowDataIds, oldRowId, rowId),
        rows: oldRows.map(
          oldRow =>
            oldRowId !== oldRow.id
              ? oldRow
              : {
                  ...oldRow,
                  id: rowId, // `<DataTable>` does not treat data as new unless ID changes
                  protocol: value,
                }
        ),
      };
    case UPDATE_ENDPOINT_GROUP_TYPE:
      return {
        ...state,
        rowDataIds: updateRowDataIds(oldRowDataIds, oldRowId, rowId),
        rows: oldRows.map(
          oldRow =>
            oldRowId !== oldRow.id
              ? oldRow
              : {
                  ...oldRow,
                  id: rowId, // `<DataTable>` does not treat data as new unless ID changes
                  source: {
                    ...oldRow.source,
                    type: value,
                  },
                }
        ),
      };
    case UPDATE_ENDPOINT_GROUP_VALUE:
      return {
        ...state,
        rowDataIds: updateRowDataIds(oldRowDataIds, oldRowId, rowId),
        rows: oldRows.map(oldRow => {
          if (oldRowId !== oldRow.id) {
            return oldRow;
          }
          const { type } = oldRow.source;
          const validator = endpointGroupValueValidators[type];
          const invalid = validator && validator(value);
          return {
            ...oldRow,
            id: rowId, // `<DataTable>` does not treat data as new unless ID changes
            source: {
              ...oldRow.source,
              value,
              invalid,
              invalidText: invalid && endpointGroupValueInvalidText[type],
            },
          };
        }),
      };
    case UPDATE_PORT_TYPE:
      return {
        ...state,
        rowDataIds: updateRowDataIds(oldRowDataIds, oldRowId, rowId),
        rows: oldRows.map(
          oldRow =>
            oldRowId !== oldRow.id
              ? oldRow
              : {
                  ...oldRow,
                  id: rowId, // `<DataTable>` does not treat data as new unless ID changes
                  value: {
                    ...oldRow.value,
                    type: value,
                    range:
                      value !== 'ip_range'
                        ? undefined
                        : oldRow.value.range || [],
                  },
                }
        ),
      };
    case UPDATE_PORT_FROM:
      return {
        ...state,
        rowDataIds: updateRowDataIds(oldRowDataIds, oldRowId, rowId),
        rows: oldRows.map(oldRow => {
          if (oldRowId !== oldRow.id) {
            return oldRow;
          }
          const to = (oldRow.value.range || [])[1];
          return {
            ...oldRow,
            id: rowId, // `<DataTable>` does not treat data as new unless ID changes
            value: {
              ...oldRow.value,
              range: [value, to],
              invalid:
                value < 0 ||
                value >= 65536 ||
                to < 0 ||
                to >= 65536 ||
                (typeof to !== 'undefined' && to < value),
              invalidText:
                value < 0 || value >= 65536 || to < 0 || to >= 65536
                  ? 'Port out of range'
                  : 'From port should not be bigger than to port',
            },
          };
        }),
      };
    case UPDATE_PORT_TO:
      return {
        ...state,
        rowDataIds: updateRowDataIds(oldRowDataIds, oldRowId, rowId),
        rows: oldRows.map(oldRow => {
          if (oldRowId !== oldRow.id) {
            return oldRow;
          }
          const from = (oldRow.value.range || [])[0];
          return {
            ...oldRow,
            id: rowId, // `<DataTable>` does not treat data as new unless ID changes
            value: {
              ...oldRow.value,
              range: [from, value],
              invalid:
                from < 0 ||
                from >= 65536 ||
                value < 0 ||
                value >= 65536 ||
                (typeof to !== 'undefined' && from > value),
              invalidText:
                from < 0 || from >= 65536 || value < 0 || value >= 65536
                  ? 'Port out of range'
                  : 'From port should not be bigger than to port',
            },
          };
        }),
      };
    default:
      return state;
  }
};

export default reducer;
