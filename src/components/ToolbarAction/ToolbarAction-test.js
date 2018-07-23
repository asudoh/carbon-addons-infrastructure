import React from 'react';
import { iconAddSolid } from 'carbon-icons';
import { shallow } from 'enzyme';
import { ToolbarAction } from '../..';

describe('ToolbarAction', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <ToolbarAction
        className="extra-class"
        icon={iconAddSolid}
        iconDescription="Add"
      />
    );

    it('renders as expected', () => {
      expect(wrapper.find('Icon').props()).toEqual({
        className: 'bx--toolbar-action__icon',
        icon: iconAddSolid,
        description: 'Add',
        role: 'img',
        fillRule: 'evenodd',
      });
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--toolbar-action')).toBe(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });
  });
});
