import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { iconAddSolid, iconCloseOutline, iconEditGlyph } from 'carbon-icons';
import {
  Button,
  Link,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListCell,
} from 'carbon-components-react';
import ToolbarAction from '../ToolbarAction';
import { StructuredListRow } from '.';

storiesOf('StructuredList', module).add('Default', () => (
  <StructuredListWrapper>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Name</StructuredListCell>
        <StructuredListCell head>Protocol</StructuredListCell>
        <StructuredListCell head>Health Path</StructuredListCell>
        <StructuredListCell head>Servers</StructuredListCell>
        <StructuredListCell head />
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell noWrap>backend 1</StructuredListCell>
        <StructuredListCell>HTTP</StructuredListCell>
        <StructuredListCell>/selfassigned</StructuredListCell>
        <StructuredListCell>
          <Link to="#">2</Link>
        </StructuredListCell>
        <StructuredListCell>
          <ToolbarAction
            onClick={action('onEditButtonClick')}
            icon={iconEditGlyph}
            iconDescription="Edit"
          />
          <ToolbarAction
            onClick={action('onDeleteButtonClick')}
            icon={iconCloseOutline}
            iconDescription="Delete"
          />
        </StructuredListCell>
      </StructuredListRow>
      <StructuredListRow>
        <StructuredListCell noWrap>backend 2</StructuredListCell>
        <StructuredListCell>HTTP</StructuredListCell>
        <StructuredListCell>/apicall</StructuredListCell>
        <StructuredListCell>
          <Button small kind="ghost" icon={iconAddSolid}>
            Attach
          </Button>
        </StructuredListCell>
        <StructuredListCell>
          <ToolbarAction
            onClick={action('onEditButtonClick')}
            icon={iconEditGlyph}
            iconDescription="Edit"
          />
          <ToolbarAction
            onClick={action('onDeleteButtonClick')}
            icon={iconCloseOutline}
            iconDescription="Delete"
          />
        </StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
));
