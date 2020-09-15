import React, { useState, useEffect } from 'react';
import classes from './AnalysisPanel.module.css';
import CloseBtn from '../../UI/Btns/CloseBtn/CloseBtn';
import PanelContainer from '../../UI/PanelContainer/PanelContainer';
import Select from '../../UI/Select/Select';
import { connect } from 'react-redux';
import { PassInput } from '../../UI/Inputs/Inputs';

const AnalysisPanel = props => {
  const [selectedName, setSelectedName] = useState('');
  const [options, setOptions] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const stockOptions = props.stocks.map(stock => ({ value: stock.name, label: stock.name }));
    setOptions(stockOptions);
  }, [props.stocks]);

  const closeHandler = () => {
    setSelectedName('');
    setErr(false);
    props.close();
  };

  const selectHandler = selectedOption => {
    if (!selectedOption) { setSelectedName(''); }
    setSelectedName(selectedOption);
    setErr(false);
  };

  return (
    <PanelContainer show={props.show} close={closeHandler}>
      <div className={props.show ? classes.Panel : `${classes.Panel} ${classes.Hide}`}>
        <CloseBtn close={closeHandler} />
        <Select options={options} change={selectHandler} val={selectedName} />
      </div>
    </PanelContainer>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks
});

export default connect(mapStateToProps)(AnalysisPanel);
