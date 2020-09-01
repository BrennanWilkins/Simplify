import React, { useState, useEffect } from 'react';
import classes from './ContribTable.module.css';
import { formatNum } from '../../../utils/formatNum';
import { formatDate } from '../../../utils/formatDate';
import { caretIcon } from '../../UI/UIIcons';

const ContribTable = props => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // show last 10 contributions
    const sortedData = [...props.data].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(dataPt => {
      return { date: formatDate(dataPt.date), val: formatNum(dataPt.val).replace('.00', '') };
    });
    setData(sortedData);
  }, [props.data]);

  return (
    <div>
      <div className={classes.Title}>
        <h3>Recent Contributions</h3>
        <span className={show ? classes.CaretDown : undefined} onClick={() => setShow(prev => !prev)}>{caretIcon}</span>
      </div>
      <div className={show ? classes.Show : classes.Hide}>
        {data.map((dataPt, i) => (
          <div key={i} className={classes.Contrib}>
            <span>{dataPt.date}</span>
            <span>${dataPt.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContribTable;
