import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { SelectItem } from 'carbon-components-react';
import GhostSelect from '.';

const overlay = invalid => (
  <Fragment>
    <label htmlFor="port-from">From</label>
    <input
      id="port-from"
      data-invalid={Boolean(invalid) || undefined}
      aria-invalid={Boolean(invalid) || undefined}
      className="bx--text-input infra-example--port-input"
    />
    <label htmlFor="port-to">to</label>
    <input
      id="port-to"
      data-invalid={Boolean(invalid) || undefined}
      aria-invalid={Boolean(invalid) || undefined}
      className="bx--text-input infra-example--port-input"
    />
  </Fragment>
);

class GhostSelectExampleWrapper extends Component {
  state = {
    value: 'option-1',
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
  };

  render() {
    const { value } = this.state;
    return this.props.children(value, this.handleChange);
  }
}

storiesOf('GhostSelect', module)
  .add('Default', () => {
    return (
      <Fragment>
        <GhostSelectExampleWrapper>
          {(value, onChange) => (
            <GhostSelect
              id="select-1"
              className="infra-example--port-select"
              labelText="Port"
              defaultValue={value}
              overlay={value === 'range' && overlay()}
              onChange={onChange}>
              <SelectItem value="any" text="Any" />
              <SelectItem value="range" text="Range" />
            </GhostSelect>
          )}
        </GhostSelectExampleWrapper>
      </Fragment>
    );
  })
  .add('invalid', () => {
    return (
      <Fragment>
        <GhostSelectExampleWrapper>
          {(value, onChange) => (
            <GhostSelect
              id="select-1"
              className="infra-example--port-select"
              labelText="Port"
              defaultValue={value}
              invalid={true}
              invalidText="Please input a valid range."
              overlay={value === 'range' && overlay(true)}
              onChange={onChange}>
              <SelectItem value="any" text="Any" />
              <SelectItem value="range" text="Range" />
            </GhostSelect>
          )}
        </GhostSelectExampleWrapper>
      </Fragment>
    );
  });
