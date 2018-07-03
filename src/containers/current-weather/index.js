import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";
import ForecastFiveList from '../forecast-five-list';
import { format } from 'date-fns'
import { mapModelToColors } from '../../modules/currentWeather'

class CurrentWeather extends Component {
  render() {
    let canShow = this.props.fetched;
    let date = new Date(this.props.currentWeather.EpochTime * 1000);
    return canShow ? (
      <Row type="flex">
        <Col span={16}>
          <Card
            style={{ width: "100%" }}
            className={'current-weather-card ' + mapModelToColors(this.props.currentWeather.IsDayTime, this.props.currentWeather.Temperature.Metric.Value)}
          >
            <div className="weather-image" />
            <div>
              <h2>{this.props.currentCity.LocalizedName}</h2>
              <h1 className="temperature">
                {this.props.currentWeather.Temperature.Metric.Value}
                <sup>o</sup>
                {this.props.currentWeather.Temperature.Metric.Unit}
              </h1>
              <h4>{this.props.currentWeather.WeatherText}</h4>
              <h4>{format(date, 'DD-MM-YY')}</h4>
            </div>
          </Card>
        </Col>
        <Col span={8} style={{ overflowY: "scroll", maxHeight: "300px" }}>
          <ForecastFiveList></ForecastFiveList>
        </Col>
      </Row>
    ) : (<Row></Row>);
  }
}

const mapStateToProps = state => ({
  currentWeather: state.currentWeather.weather,
  pending: state.currentWeather.pending,
  fetched: state.currentWeather.fetched,
  errorMsg: state.currentWeather.errorMsg,
  currentCity: state.locationFinder.currentCity
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentWeather);
