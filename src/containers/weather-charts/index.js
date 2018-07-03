import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";
import { Line, Bar } from "react-chartjs-2";

const data = {
  labels: [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ],
  datasets: [
    {
      label: "temperatura",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#bce784",
      borderColor: "#bce784",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#01baef",
      pointBackgroundColor: "#01baef",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#bce784",
      pointHoverBorderColor: "#bce784",
      pointHoverBorderWidth: 1,
      pointRadius: 5,
      pointHitRadius: 15,
      data: [13, 13.5, 14, 16, 15, 14, 14, 13.5, 12]
    }
  ]
};

const barData = {
  labels: [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
  ],
  datasets: [
    {
      label: "opady",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#01baef",
      borderColor: "#01baef",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#bce784",
      pointBackgroundColor: "#bce784",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#bce784",
      pointHoverBorderColor: "#bce784",
      pointHoverBorderWidth: 1,
      pointRadius: 5,
      pointHitRadius: 15,
      data: [13, 13.5, 14, 16, 15, 14, 14, 13.5, 13]
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: "bottom"
  },
  tooltips: {
    backgroundColor: "#01baef"
  }
};

class WeatherCharts extends Component {
  render() {
    let canShow = this.props.fetched;
    return canShow ? (
      <div>
        <Row type="flex">
          <Col span={24}>
            <Card style={{ width: "100%" }}>
              <div className="chart-wrapper">
                <Line data={data} options={options} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={24}>
            <Card style={{ width: "100%" }}>
              <div className="chart-wrapper">
                <Bar data={barData} options={options} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    ) : (
      <Row />
    );
  }
}

const mapStateToProps = state => ({
  currentWeather: state.currentWeather.weather,
  fetched: state.currentWeather.fetched
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherCharts);
