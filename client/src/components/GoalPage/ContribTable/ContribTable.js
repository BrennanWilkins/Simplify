import React, { useState, useEffect } from 'react';
import classes from './ContribTable.module.css';

const ContribTable = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // show last 10 contributions
    
  }, [props.data]);

  return (
    <div>
    </div>
  );
};

export default ContribTable;
