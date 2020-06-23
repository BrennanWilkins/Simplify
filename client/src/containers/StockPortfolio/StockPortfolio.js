import React from 'react';
// import {stockInstance} from '../../axios';
import Spinner from '../../components/Spinner/Spinner';
import StockUI from '../../components/PortfolioUI/StockUI/StockUI';
import EditComponent from '../../components/EditComponent/EditComponent';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class StockPortfolio extends React.Component {
  state = {
    editing: false,
    edit: {
      editStock: '',
      editAmnt: '',
      editAction: '',
      editErrorMsg: '',
      editError: false
    }
  }

  componentDidMount() {
    this.props.onGetPrices();
    this.props.onGetPortfolio();
  }

  changeStock = (action, stock) => {
    const edit = {...this.state.edit};
    edit.editStock = stock;
    edit.editAction = action;
    this.setState({ edit: edit, editing: true });
  }

  editAmnt = (e) => {
    const edit = {...this.state.edit};
    edit.editAmnt = e.target.value;
    if (edit.editAmnt === '') {
      edit.editError = false;
      edit.editErrorMsg = '';
    }
    this.setState({ edit: edit });
  }

  confirmChangeStock = () => {
    const edit = {...this.state.edit};
    const stocks = {...this.props.stocks};
    const stock = {...stocks[edit.editStock]};
    if (edit.editAction === 'buy') {
      const sum = Number(edit.editAmnt) + Number(stock.shares);
      stock.shares = sum;
    } else if (edit.editAction === 'sell'){
      const sum = Number(stock.shares) - Number(edit.editAmnt);
      stock.shares = sum;
      if (stock.shares < 0) {
        edit.editError = true;
        edit.editErrorMsg = 'You do not have enough ' + edit.editStock + ' to sell this much.';
        this.setState({ edit: edit });
        return;
      }
    }
    const newEdit = { editStock: '', editAmnt: '', editAction: '', editErrorMsg: '', editError: false }
    stocks[edit.editStock] = stock;
    this.props.onUpdatePortfolio(stocks);
    this.setState({ editing: false, edit: newEdit });
  }

  finishEdit = (bool) => {
    if (bool) {
      if (isNaN(this.state.edit.editAmnt) || (this.state.edit.editAmnt.trim() === '')) {
        const edit = {...this.state.edit};
        edit.editError = true;
        edit.editErrorMsg = 'Please enter a valid number.';
        this.setState({ edit });
        return;
      }
      this.confirmChangeStock();
    } else {
      const edit = { editStock: '', editAmnt: '', editAction: '', editError: false };
      this.setState({ editing: false, edit });
    }
  }

  render() {
    let errorMsg = null;
    if (this.state.error) {
      errorMsg = <h3 style={{color: 'rgba(217, 76, 7, 0.7)', textAlign: 'center'}}>Stock price data couldn't be loaded.</h3>;
    }
    let props = {stocks: this.props.stocks, totalValue: this.props.totalValue};
    let portfolio = <StockUI changeStock={this.changeStock} {...props}/>;
    let content = this.props.loading ? <Spinner /> : portfolio;
    let edit = null;

    if (this.state.editing) {
      edit = <EditComponent editable={this.state.edit.editStock}
      action={this.state.edit.editAction} error={this.state.edit.editError}
      errorMsg={this.state.edit.editErrorMsg} amnt={this.state.edit.editAmnt}
      editAmnt={this.editAmnt} finishEdit={this.finishEdit}/>;
    }
    return (
      <div>
        <h1 style={{textAlign: 'center', marginTop: '70px'}}>Stock Portfolio</h1>
        {errorMsg}
        {content}
        {edit}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stock.stocks,
    totalValue: state.stock.totalValue,
    error: state.stock.error,
    loading: state.stock.loading,
    errorMsg: state.stock.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPrices: () => dispatch(actions.getStockPrices()),
    onGetPortfolio: () => dispatch(actions.getStockPortfolio()),
    onUpdatePortfolio: (stocks) => dispatch(actions.updateStockPortfolio(stocks))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPortfolio);







// before redux:
// state = {
//   stocks: {
//     AAPL: { shares: 1, price: 0 },
//     GOOGL: { shares: 1, price: 0 },
//     MSFT: { shares: 1, price: 0 },
//     AMZN: { shares: 1, price: 0 },
//     // TSLA: { shares: 1, price: 0 },
//     SPY: { shares: 1, price: 0 },
//     // VOO: { shares: 1, price: 0 }
//   },
//   totalValue: 0,
//   error: false,
//   loading: true
//   editing: false,
//   edit: {
//     editStock: '',
//     editAmnt: '',
//     editAction: '',
//     editErrorMsg: '',
//     editError: false
//   }
// }
//
// componentDidMount() {
//   //** refactor this
//   stockInstance.get('aapl').then(res1 => {
//     return stockInstance.get('googl').then(res2 => {
//       return stockInstance.get('msft').then(res3 => {
//         return stockInstance.get('amzn').then(res4 => {
//           return stockInstance.get('spy').then(res5 => {
//             const resp = [res1, res2, res3, res4, res5];
//             const stocks = {...this.state.stocks};
//             for (let res of resp) {
//               const stock = {...stocks[res.data["Global Quote"]["01. symbol"]]}
//               stock.price = Number(res.data["Global Quote"]["05. price"]).toFixed(2);
//               stocks[res.data["Global Quote"]["01. symbol"]] = stock;
//             }
//             let totalValue = 0;
//             for (let key in stocks) {
//               totalValue += (Number(stocks[key].price) * Number(stocks[key].shares));
//             }
//             console.log(stocks);
//             this.setState({ stocks, totalValue, loading: false });
//           }).catch(err => {
//             console.log(err);
//             this.setState({ error: true, loading: false });
//           });
//         });
//       });
//     });
//   });
// }
//
// changeStock = (action, stock) => {
//   const edit = {...this.state.edit};
//   edit.editStock = stock;
//   edit.editAction = action;
//   this.setState({ edit: edit, editing: true });
// }
//
// editAmnt = (e) => {
//   const edit = {...this.state.edit};
//   edit.editAmnt = e.target.value;
//   if (edit.editAmnt == '') {
//     edit.editError = false;
//     edit.editErrorMsg = '';
//   }
//   this.setState({ edit: edit });
// }
//
// confirmChangeStock = () => {
//   const edit = {...this.state.edit};
//   const stocks = {...this.state.stocks};
//   const stock = {...stocks[edit.editStock]};
//   if (edit.editAction == 'buy') {
//     const sum = Number(edit.editAmnt) + Number(stock.shares);
//     stock.shares = sum;
//   } else if (edit.editAction == 'sell'){
//     const sum = Number(stock.shares) - Number(edit.editAmnt);
//     stock.shares = sum;
//     if (stock.shares < 0) {
//       edit.editError = true;
//       edit.editErrorMsg = 'You do not have enough ' + edit.editStock + ' to sell this much.';
//       this.setState({ edit: edit });
//       return;
//     }
//   }
//   const newEdit = { editStock: '', editAmnt: '', editAction: '', editErrorMsg: '', editError: false }
//   stocks[edit.editStock] = stock;
//   this.setState({ stocks, editing: false, edit: newEdit });
// }
//
// finishEdit = (bool) => {
//   if (bool) {
//     if (isNaN(this.state.edit.editAmnt) || (this.state.edit.editAmnt.trim() == '')) {
//       const edit = {...this.state.edit};
//       edit.editError = true;
//       edit.editErrorMsg = 'Please enter a valid number.';
//       this.setState({ edit });
//       return;
//     }
//     this.confirmChangeStock();
//   } else {
//     const edit = { editStock: '', editAmnt: '', editAction: '', editError: false };
//     this.setState({ editing: false, edit });
//   }
// }
//
// render() {
//   let errorMsg = null;
//   if (this.state.error) {
//     errorMsg = <h3 style={{color: 'rgba(217, 76, 7, 0.7)', textAlign: 'center'}}>Stock price data couldn't be loaded.</h3>;
//   }
//   let props = {stocks: this.state.stocks, totalValue: this.state.totalValue};
//   let portfolio = <StockUI changeStock={this.changeStock} {...props}/>;
//   let content = this.state.loading ? <Spinner /> : portfolio;
//   // let content = portfolio;
//   let edit = null;
//   if (this.state.editing) {
//     edit = <EditComponent editable={this.state.edit.editStock}
//     action={this.state.edit.editAction} error={this.state.edit.editError}
//     errorMsg={this.state.edit.editErrorMsg} amnt={this.state.edit.editAmnt}
//     editAmnt={this.editAmnt} finishEdit={this.finishEdit}/>;
//   }
//   return (
//     <div>
//       <h1 style={{textAlign: 'center', marginTop: '70px'}}>Stock Portfolio</h1>
//       {errorMsg}
//       {content}
//       {edit}
//     </div>
//   );
// }
