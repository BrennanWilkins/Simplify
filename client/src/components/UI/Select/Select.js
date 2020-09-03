import React from 'react';
import ReactSelect from 'react-select';
import './Select.css';

const Select = props => (
  <ReactSelect
    options={props.options}
    className="select-dropdown"
    onChange={props.change}
    isSearchable
    value={props.val}
    classNamePrefix="react-select"
  />
);

export default Select;
