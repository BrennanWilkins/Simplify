import React from 'react';

const Form = props => (
  <form onSubmit={e => { e.preventDefault(); if (props.allow) { props.submit(); } }}>{props.children}</form>
);

export default Form;
