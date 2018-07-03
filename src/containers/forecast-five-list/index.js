import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, List, Button } from "antd";
import { format } from 'date-fns'

import wind from '../../assets/svg/wind.svg'
import temperature from '../../assets/svg/temperature.svg'
import sunny from '../../assets/svg/sunny.svg'
import pressure from '../../assets/svg/pressure.svg'

import FORECAST_MOCK from '../../assets/fiveday'

const forecast = JSON.parse(FORECAST_MOCK).DailyForecasts;

class ForecastFiveList extends Component {
  render() {
    // console.warn(forecast);
    let canShow = this.props.fetched;
    return canShow ? (
      <div>
        <Card style={{ width: "100%", padding: "0px" }}>
          <List
            size="large"
            header={<div>Prognoza 5 dniowa</div>}
            dataSource={forecast}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  // avatar={
                  //   <Button
                  //     type="primary"
                  //     shape="circle"
                  //     icon="right"
                  //     size={"large"}
                  //     ghost
                  //   />
                  // }
                  title={format(new Date(item.Date), 'DD-MM-YY')}
                  description={'Dzień: ' + item.Day.ShortPhrase + ', Noc: ' + item.Night.ShortPhrase}
                />
                <div>
                  <img style={{height: 40}} src={temperature} /> {item.Temperature.Minimum.Value}<sup>o</sup>{item.Temperature.Minimum.Unit} / {item.Temperature.Maximum.Value}<sup>o</sup>{item.Temperature.Maximum.Unit}
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    ) : (
      <Card />
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
)(ForecastFiveList);
