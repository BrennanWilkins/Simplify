import React from 'react';
// import {cryptoInstance} from '../../axios';
import Spinner from '../../components/Spinner/Spinner';
import CryptoUI from '../../components/PortfolioUI/CryptoUI/CryptoUI';
import EditComponent from '../../components/EditComponent/EditComponent';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class CryptoPortfolio extends React.Component {
  state = {
    editing: false,
    edit: {
      editCoin: '',
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

  changeCoin = (action, coin) => {
    const edit = {...this.state.edit};
    edit.editCoin = coin;
    edit.editAction = action;
    this.setState({ edit, editing: true });
  }

  editAmnt = (e) => {
    const edit = {...this.state.edit};
    edit.editAmnt = e.target.value;
    if (edit.editAmnt === '') {
      edit.editError = false;
      edit.editErrorMsg = '';
    }
    this.setState({ edit });
  }

  confirmChangeCoin = () => {
    const edit = {...this.state.edit};
    const cryptos = {...this.props.cryptos};
    const coin = {...cryptos[edit.editCoin]};
    if (edit.editAction === 'buy') {
      const sum = Number(edit.editAmnt) + Number(coin.quantity);
      coin.quantity = sum;
    } else if (edit.editAction === 'sell'){
      const sum = Number(coin.quantity) - Number(edit.editAmnt);
      coin.quantity = sum;
      if (coin.quantity < 0) {
        edit.editError = true;
        edit.editErrorMsg = 'You do not have enough ' + edit.editCoin + ' to sell this much.';
        this.setState({ edit });
        return;
      }
    }
    cryptos[edit.editCoin] = coin;
    const newEdit = { editCoin: '', editAmnt: '', editAction: '', editErrorMsg: '', editError: false }
    this.props.onUpdatePortfolio(cryptos);
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
      this.confirmChangeCoin();
    } else {
      const edit = { editCoin: '', editAmnt: '', editAction: '', editError: false };
      this.setState({ editing: false, edit });
    }
  }

  render() {
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <h3 style={{color: 'rgba(217, 76, 7, 0.7)', textAlign: 'center'}}>{this.props.errorMsg}</h3>;
    }
    let props = {cryptos: this.props.cryptos, totalValue: this.props.totalValue};
    let portfolio = <CryptoUI {...props} changeCoin={this.changeCoin}/>;
    let content = this.props.loading ? <Spinner /> : portfolio;
    let edit = null;
    if (this.state.editing) {
      edit = <EditComponent editable={this.state.edit.editCoin}
      action={this.state.edit.editAction} error={this.state.edit.editError}
      errorMsg={this.state.edit.editErrorMsg} amnt={this.state.edit.editAmnt}
      editAmnt={this.editAmnt} finishEdit={this.finishEdit}/>;
    }
    return (
      <div>
        <h1 style={{textAlign: 'center', marginTop: '70px'}}>Crypto Portfolio</h1>
        {errorMsg}
        {content}
        {edit}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cryptos: state.crypto.cryptos,
    totalValue: state.crypto.totalValue,
    error: state.crypto.error,
    loading: state.crypto.loading,
    errorMsg: state.crypto.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPrices: () => dispatch(actions.getCryptoPrices()),
    onGetPortfolio: () => dispatch(actions.getCryptoPortfolio()),
    onUpdatePortfolio: (cryptos) => dispatch(actions.updateCryptoPortfolio(cryptos))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoPortfolio);






// before redux version:
// state = {
//   cryptos: {
//     btc: { quantity: 1, price: 0},
//     eth: { quantity: 1, price: 0},
//     ltc: { quantity: 1, price: 0}
//   },
//   totalValue: 0,
//   error: false,
//   loading: true,
//   editing: false,
//   edit: {
//     editCoin: '',
//     editAmnt: '',
//     editAction: '',
//     editErrorMsg: '',
//     editError: false
//   }
// }
//
// componentDidMount() {
//   cryptoInstance.get('btc').then(res1 => {
//     return cryptoInstance.get('ltc').then(res2 => {
//       return cryptoInstance.get('eth').then(res3 => {
//         const cryptos = {...this.state.cryptos};
//         const btcPrice = res1.data['1'].quote.USD.price.toFixed(2);
//         const btc = {...cryptos.btc};
//         btc.price = btcPrice;
//         const ltcPrice = res2.data['2'].quote.USD.price.toFixed(2);
//         const ltc = {...cryptos.ltc};
//         ltc.price = ltcPrice;
//         let ethPrice = res3.data['1027'].quote.USD.price.toFixed(2);
//         const eth = {...cryptos.eth};
//         eth.price = ethPrice;
//         let totalValue = (btc.price * btc.quantity) + (ltc.price * ltc.quantity) +
//         (eth.price * eth.quantity);
//         cryptos.btc = btc;
//         cryptos.eth = eth;
//         cryptos.ltc = ltc;
//         this.setState({ cryptos, totalValue, loading: false });
//       }).catch(err => {
//         this.setState({ error: true, loading: false });
//       });
//     });
//   });
// }
//
// changeCoin = (action, coin) => {
//   const edit = {...this.state.edit};
//   edit.editCoin = coin;
//   edit.editAction = action;
//   this.setState({ edit, editing: true });
// }
//
// editAmnt = (e) => {
//   const edit = {...this.state.edit};
//   edit.editAmnt = e.target.value;
//   if (edit.editAmnt == '') {
//     edit.editError = false;
//     edit.editErrorMsg = '';
//   }
//   this.setState({ edit });
// }
//
// confirmChangeCoin = () => {
//   const edit = {...this.state.edit};
//   const cryptos = {...this.state.cryptos};
//   const coin = {...cryptos[edit.editCoin]};
//   if (edit.editAction == 'buy') {
//     const sum = Number(edit.editAmnt) + Number(coin.quantity);
//     coin.quantity = sum;
//   } else if (edit.editAction == 'sell'){
//     const sum = Number(coin.quantity) - Number(edit.editAmnt);
//     coin.quantity = sum;
//     if (coin.quantity < 0) {
//       edit.editError = true;
//       edit.editErrorMsg = 'You do not have enough ' + edit.editCoin + ' to sell this much.';
//       this.setState({ edit });
//       return;
//     }
//   }
//   cryptos[edit.editCoin] = coin;
//   const newEdit = { editCoin: '', editAmnt: '', editAction: '', editErrorMsg: '', editError: false }
//   this.setState({ cryptos, editing: false, edit: newEdit });
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
//     this.confirmChangeCoin();
//   } else {
//     const edit = { editCoin: '', editAmnt: '', editAction: '', editError: false };
//     this.setState({ editing: false, edit });
//   }
// }
//
// render() {
//   let errorMsg = null;
//   if (this.state.error) {
//     errorMsg = <h3 style={{color: 'rgba(217, 76, 7, 0.7)', textAlign: 'center'}}>Crypto price data couldn't be loaded.</h3>;
//   }
//   let props = {cryptos: this.state.cryptos, totalValue: this.state.totalValue};
//   let portfolio = <CryptoUI {...props} changeCoin={this.changeCoin}/>;
//   let content = this.state.loading ? <Spinner /> : portfolio;
//   let edit = null;
//   if (this.state.editing) {
//     edit = <EditComponent editable={this.state.edit.editCoin}
//     action={this.state.edit.editAction} error={this.state.edit.editError}
//     errorMsg={this.state.edit.editErrorMsg} amnt={this.state.edit.editAmnt}
//     editAmnt={this.editAmnt} finishEdit={this.finishEdit}/>;
//   }
//   return (
//     <div>
//       <h1 style={{textAlign: 'center', marginTop: '70px'}}>Crypto Portfolio</h1>
//       {errorMsg}
//       {content}
//       {edit}
//     </div>
//   );
// }
