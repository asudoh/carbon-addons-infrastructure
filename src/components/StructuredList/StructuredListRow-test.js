import React from 'react';
import { StructuredListRow } from '../../';
import { shallow } from 'enzyme';

describe('StructuredListRow', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <StructuredListRow className="extra-class">
        <div className="child">Test</div>
      </StructuredListRow>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('infra--structured-list-row')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});
