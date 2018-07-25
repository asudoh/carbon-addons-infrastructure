import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { DataTable, Icon, Select, SelectItem } from 'carbon-components-react';
import { iconAddOutline, iconEdit, iconSubtractGlyph } from 'carbon-icons';

import {
  TableBatchAction,
  TableBatchEditable,
  TableBatchEditableContainer,
  TableBatchEditActions,
  TableBatchEditDeleteCell,
  TableBatchEditDeleteHeader,
  TableBatchEditGhostSelect,
  TableBatchEditTextInput,
} from '../DataTable';

import store from './story-store/store';
import ExampleRuleEditTableContainer from './story-store/container';

const {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
} = DataTable;

const headersRule = [
  {
    key: 'protocol',
    header: 'Protocol',
    items: [
      {
        id: 'tcp',
        label: 'TCP',
      },
      {
        id: 'udp',
        label: 'UDP',
      },
      {
        id: 'icmp',
        label: 'ICMP',
      },
      {
        id: 'all',
        label: 'All',
      },
    ],
  },
  {
    key: 'source',
    header: 'Source',
    typeItems: [
      {
        id: 'any',
        label: 'Any',
      },
      {
        id: 'ip_address',
        label: 'IP address',
      },
      {
        id: 'cidr_block',
        label: 'CIDR block',
      },
      {
        id: 'security_group',
        label: 'Security group',
      },
    ],
    securityGroupItems: [
      {
        id: 'magni_a_tenetur',
        label: 'Magni a tenetur',
      },
      {
        id: 'quia_neque',
        label: 'Quia neque',
      },
      {
        id: 'eaque_est',
        label: 'Eaque est',
      },
      {
        id: 'omnis_voluptas',
        label: 'Omnis voluptas',
      },
    ],
  },
  {
    key: 'value',
    header: 'Value',
    items: [
      {
        id: 'any',
        label: 'Any',
      },
      {
        id: 'ip_range',
        label: 'IP range',
      },
    ],
  },
  {
    key: 'delete',
    header: '',
  },
];

const ExampleProtocolCell = ({ id, cellDataId, value, items, onChange }) => (
  <TableCell key={cellDataId}>
    <Select
      id={`${id}__select`}
      key={`${cellDataId}__select`}
      data-id={id}
      data-field="protocol"
      defaultValue={value}
      hideLabel
      onChange={onChange}>
      {items.map(item => (
        <SelectItem key={item.id} value={item.id} text={item.label} />
      ))}
    </Select>
  </TableCell>
);

const ExampleEndpointGroupTypeCell = ({
  id,
  cellDataId,
  type,
  items,
  onChange,
}) => (
  <TableCell key={cellDataId}>
    <Select
      id={`${id}__select`}
      key={`${cellDataId}__select`}
      data-id={id}
      data-field="endpoint-group-type"
      defaultValue={type}
      hideLabel
      onChange={onChange}>
      {items.map(item => (
        <SelectItem key={item.id} value={item.id} text={item.label} />
      ))}
    </Select>
  </TableCell>
);

const ExampleEndpointGroupValueCell = ({
  id,
  cellDataId,
  type,
  value,
  items,
  invalid,
  invalidText,
  onChange,
}) => (
  <TableCell key={cellDataId}>
    {(() => {
      if (type === 'ip_address') {
        return (
          <TableBatchEditTextInput
            id={`${id}__ip_address__input`}
            key={`${cellDataId}__ip_address__input`}
            data-id={id}
            data-field="endpoint-group-value"
            value={value}
            invalid={invalid}
            invalidText={invalidText}
            onChange={onChange}
          />
        );
      }
      if (type === 'cidr_block') {
        return (
          <TableBatchEditTextInput
            id={`${id}__cidr_block__input`}
            key={`${cellDataId}__cidr_block__input`}
            data-id={id}
            data-field="endpoint-group-value"
            value={value}
            invalid={invalid}
            invalidText={invalidText}
            onChange={onChange}
          />
        );
      }
      if (type === 'security_group') {
        return (
          <Select
            id={`${id}__security_group__select`}
            key={`${cellDataId}__security_group__select`}
            data-id={id}
            data-field="endpoint-group-value"
            defaultValue={value}
            hideLabel
            onChange={onChange}>
            {items.map(item => (
              <SelectItem key={item.id} value={item.id} text={item.label} />
            ))}
          </Select>
        );
      }
      return (
        <span className="infra-example--endpoint-value-cell-default">
          0.0.0.0
        </span>
      );
    })()}
  </TableCell>
);

const ExampleEndpointGroupCell = ({
  id,
  cellDataId,
  type,
  value,
  typeItems,
  securityGroupItems,
  invalid,
  invalidText,
  onChange,
}) => {
  return (
    <Fragment>
      <ExampleEndpointGroupTypeCell
        id={id}
        cellDataId={cellDataId}
        type={type}
        items={typeItems}
        onChange={onChange}
      />
      <ExampleEndpointGroupValueCell
        id={id}
        cellDataId={cellDataId}
        type={type}
        value={value}
        items={securityGroupItems}
        invalid={invalid}
        invalidText={invalidText}
        onChange={onChange}
      />
    </Fragment>
  );
};

const ExamplePortRangeCell = ({
  id,
  cellDataId,
  type,
  value,
  invalid,
  invalidText,
  items,
  onChange,
}) => {
  const overlay = type === 'ip_range' && (
    <Fragment>
      <label htmlFor={`${id}__port_from`}>From</label>
      <input
        id={`${id}__port_from`}
        key={`${cellDataId}__port_from`}
        data-id={id}
        data-field="port-from"
        data-invalid={invalid || undefined}
        className="bx--text-input infra-example--port-input"
        value={value[0]}
        onChange={onChange}
      />
      <label htmlFor={`${id}__port_to`}>to</label>
      <input
        id={`${id}__port_to`}
        key={`${cellDataId}__port_to`}
        data-id={id}
        data-field="port-to"
        data-invalid={invalid || undefined}
        className="bx--text-input infra-example--port-input"
        value={value[1]}
        onChange={onChange}
      />
    </Fragment>
  );
  return (
    <TableCell key={cellDataId}>
      <TableBatchEditGhostSelect
        id={`${id}__select`}
        key={`${cellDataId}__select`}
        data-id={id}
        data-field="port-type"
        className="infra-example--port-select"
        hideLabel={true}
        defaultValue={type}
        invalid={invalid}
        invalidText={invalidText}
        overlay={overlay}
        onChange={onChange}>
        {items.map(item => (
          <SelectItem key={item.id} value={item.id} text={item.label} />
        ))}
      </TableBatchEditGhostSelect>
    </TableCell>
  );
};

const ExampleDeleteCell = ({ id, onClick }) => (
  <TableBatchEditDeleteCell key={id} className="infra-example--delete-cell">
    <button data-id={id} onClick={onClick}>
      <Icon icon={iconSubtractGlyph} />
    </button>
  </TableBatchEditDeleteCell>
);

const ExampleRuleReadCell = ({
  cellType,
  cellDataId,
  value,
  items,
  typeItems,
  securityGroupItems,
}) => {
  if (cellType === 'protocol') {
    const { label } = items.find(item => value === item.id) || {};
    return <TableCell key={cellDataId}>{label}</TableCell>;
  }
  if (cellType === 'source') {
    const { label: typeLabel } =
      typeItems.find(item => value.type === item.id) || {};
    const valueLabel =
      value.type === 'any'
        ? '0.0.0.0'
        : value.type !== 'security_group'
          ? value.value
          : (securityGroupItems.find(item => value.value === item.id) || {})
              .label;
    return (
      <Fragment>
        <TableCell key={`${cellDataId}-label`}>{typeLabel}</TableCell>
        <TableCell key={`${cellDataId}-value`}>{valueLabel}</TableCell>
      </Fragment>
    );
  }
  if (cellType === 'value') {
    return (
      <TableCell key={cellDataId}>
        {value.type !== 'ip_range'
          ? 'Any'
          : `From ${value.range[0]} to ${value.range[1]}`}
      </TableCell>
    );
  }
  return <TableCell key={cellDataId}>{value}</TableCell>;
};

const ExampleRuleEditCell = ({
  cellType,
  id,
  cellDataId,
  value,
  items,
  typeItems,
  securityGroupItems,
  onChange,
  onDelete,
}) => {
  if (cellType === 'protocol') {
    return (
      <ExampleProtocolCell
        id={id}
        cellDataId={cellDataId}
        value={value}
        items={items}
        onChange={onChange}
      />
    );
  }
  if (cellType === 'source') {
    return (
      <ExampleEndpointGroupCell
        id={id}
        cellDataId={cellDataId}
        type={value.type}
        value={value.value}
        typeItems={typeItems}
        securityGroupItems={securityGroupItems}
        invalid={value.invalid}
        invalidText={value.invalidText}
        onChange={onChange}
      />
    );
  }
  if (cellType === 'value') {
    return (
      <ExamplePortRangeCell
        id={id}
        cellDataId={cellDataId}
        type={value.type}
        value={value.range}
        invalid={value.invalid}
        invalidText={value.invalidText}
        items={items}
        onChange={onChange}
      />
    );
  }
  if (cellType === 'delete') {
    return <ExampleDeleteCell id={id} onClick={onDelete} />;
  }
  return <TableCell key={cellDataId}>{value}</TableCell>;
};

storiesOf('DataTable batch editing', module).add('Default', () => (
  <Provider store={store}>
    <ExampleRuleEditTableContainer
      headers={headersRule}
      render={({
        rowDataIds,
        rows,
        headers,
        getHeaderProps,
        editing,
        saving,
        saved,
        onCancelEdit,
        onRequestSave,
        onChangeCell,
        onAddRule,
        onSetEditMode,
        onDeleteRule,
      }) => {
        return (
          <TableBatchEditableContainer
            title="DataTable with batch actions"
            editing={editing}>
            <TableToolbar>
              <TableBatchEditActions
                shouldShowBatchActions={editing}
                saving={saving}
                saved={saved}
                onCancel={onCancelEdit}
                onSave={onRequestSave}>
                <TableBatchAction icon={iconAddOutline} onClick={onAddRule}>
                  Add rule
                </TableBatchAction>
              </TableBatchEditActions>
              <TableToolbarContent>
                <TableToolbarAction
                  icon={iconEdit}
                  iconDescription="Edit"
                  onClick={onSetEditMode}
                />
              </TableToolbarContent>
            </TableToolbar>
            <TableBatchEditable saving={editing && saving}>
              <TableHead>
                <TableRow>
                  {headers.map(header => {
                    const Header =
                      header.key !== 'delete'
                        ? TableHeader
                        : TableBatchEditDeleteHeader;
                    const className =
                      header.key !== 'value'
                        ? undefined
                        : 'infra-example--value-cell';
                    return (
                      <Header
                        {...getHeaderProps({ header })}
                        className={className}
                        isSortable={false}
                        colSpan={header.key !== 'source' ? 1 : 2}>
                        {header.header}
                      </Header>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={rowDataIds[row.id]}>
                    {row.cells.map((cell, i) => {
                      const {
                        key,
                        items,
                        typeItems,
                        securityGroupItems,
                      } = headers[i];
                      const { id, value } = cell;
                      return !editing ? (
                        <ExampleRuleReadCell
                          cellType={key}
                          key={`${rowDataIds[row.id]}-${key}`}
                          cellDataId={`${rowDataIds[row.id]}-${key}`}
                          value={value}
                          items={items}
                          typeItems={typeItems}
                          securityGroupItems={securityGroupItems}
                        />
                      ) : (
                        <ExampleRuleEditCell
                          cellType={key}
                          id={id}
                          key={`${rowDataIds[row.id]}-${key}`}
                          cellDataId={`${rowDataIds[row.id]}-${key}`}
                          value={value}
                          items={items}
                          typeItems={typeItems}
                          securityGroupItems={securityGroupItems}
                          onChange={onChangeCell}
                          onDelete={onDeleteRule}
                        />
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </TableBatchEditable>
          </TableBatchEditableContainer>
        );
      }}
    />
  </Provider>
));
