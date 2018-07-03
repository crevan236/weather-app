import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Icon } from "antd";

import wind from '../../assets/svg/wind.svg'
import temperature from '../../assets/svg/temperature.svg'
import sunny from '../../assets/svg/sunny.svg'
import pressure from '../../assets/svg/pressure.svg'

class WeatherDetails extends Component {
  render() {
    let canShow = this.props.fetched;
    return canShow ? (
      <Row type="flex">
        <Col span={4} className="detail-card">
          <Card style={{ width: "100%" }}>
            <h3>
              <Icon type="info-circle" /> Szczegóły
            </h3>
          </Card>
        </Col>
        <Col span={5} className="detail-card">
          <Card style={{ width: "100%" }}>
            <h3>
              <img
                src={wind}
                style={{ height: "24px", width: "auto" }}
              />&nbsp;&nbsp;
              {this.props.currentWeather.Wind.Speed.Metric.Value}&nbsp;
              {this.props.currentWeather.Wind.Speed.Metric.Unit}&nbsp;
              {this.props.currentWeather.Wind.Direction.Localized}&nbsp;
            </h3>
          </Card>
        </Col>
        <Col span={5} className="detail-card">
          <Card style={{ width: "100%" }}>
            <h3>
              <img
                src={temperature}
                style={{ height: "24px", width: "auto" }}
                alt=""
              />&nbsp;&nbsp;Temp. odczuwalna:&nbsp;
              {this.props.currentWeather.RealFeelTemperature.Metric.Value}&nbsp;<sup>o</sup>{this.props.currentWeather.RealFeelTemperature.Metric.Unit}
            </h3>
          </Card>
        </Col>
        <Col span={5} className="detail-card">
          <Card style={{ width: "100%" }}>
            <h3>
              <img
                src={sunny}
                style={{ height: "24px", width: "auto" }}
                alt=""
              />&nbsp;&nbsp;Indeks UV: {this.props.currentWeather.UVIndex}
            </h3>
          </Card>
        </Col>
        <Col span={5} className="detail-card">
          <Card style={{ width: "100%" }}>
            <h3>
              <img
                src={pressure}
                style={{ height: "24px", width: "auto" }}
                alt=""
              />&nbsp;&nbsp;Ciśnienie: {this.props.currentWeather.Pressure.Metric.Value}&nbsp;{this.props.currentWeather.Pressure.Metric.Unit}
            </h3>
          </Card>
        </Col>
      </Row>
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
)(WeatherDetails);
