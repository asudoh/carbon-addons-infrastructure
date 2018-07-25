import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const initialRows = [
  {
    id: 'a',
    protocol: 'all',
    source: {
      type: 'any',
    },
    value: {
      type: 'any',
    },
  },
  {
    id: 'b',
    protocol: 'tcp',
    source: {
      type: 'cidr_block',
      value: '0.0.0.0/24',
    },
    value: {
      type: 'ip_range',
      range: [80, 8080],
    },
  },
  {
    id: 'c',
    protocol: 'udp',
    source: {
      type: 'security_group',
      value: 'eaque_est',
    },
    value: {
      type: 'any',
    },
  },
];

const middlewares = [thunkMiddleware, loggerMiddleware];
const store = createStore(
  reducer,
  {
    rows: initialRows,
    savedRows: initialRows,
    rowDataIds: initialRows.reduce(
      (o, row) => ({
        ...o,
        [row.id]: row.id,
      }),
      {}
    ),
  },
  applyMiddleware(...middlewares)
);

export default store;
