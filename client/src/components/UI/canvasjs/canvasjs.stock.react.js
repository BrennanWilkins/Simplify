const React = require('react');
let CanvasJS = require('./canvasjs.stock.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

class CanvasJSStockChart extends React.Component {
	static _cjsContainerId = 0
	constructor(props) {
		super(props);
		this.options = props.options ? props.options : {};
		this.containerProps = props.containerProps ? props.containerProps : { width: "100%", position: "relative" };
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
		this.chartContainerId = "canvasjs-react-stockchart-container-" + CanvasJSStockChart._cjsContainerId++;
	}
	componentDidMount() {
		//Create Chart and Render
		this.stockChart = new CanvasJS.StockChart(this.chartContainerId, this.options);
		this.stockChart.render();

		if (this.props.onRef)
			this.props.onRef(this.stockChart);
	}
	shouldComponentUpdate(nextProps, nextState) {
		//Check if Chart-options has changed and determine if component has to be updated
		return !(nextProps.options === this.options);
	}
	componentDidUpdate() {
		//Update Chart Options & Render
		this.stockChart.options = this.props.options;
		this.stockChart.render();
	}
	componentWillUnmount() {
		//Destroy chart and remove reference
		this.stockChart.destroy();
		if (this.props.onRef)
			this.props.onRef(undefined);
	}
	render() {
		return <div id={this.chartContainerId} style={this.containerProps} />
	}
}

export default CanvasJSStockChart;
