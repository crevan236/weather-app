import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Layout,
  Row,
  Col,
  Card, Button, Icon, AutoComplete, Input
} from "antd";
import { setAvalibleCitiesByMock, setCurrentPositionByGeolocation, fetchCities } from '../../modules/locationFinder'
import { debounce } from 'throttle-debounce'

const Option = AutoComplete.Option

class CityFinder extends Component {
  render() {
    const options = this.props.citiesAvalible.map((item) => {
      return <Option key={item.Key}>{`${item.LocalizedName}, ${item.Country.LocalizedName}`}</Option>
    });
    return (
      <Row type="flex">
        <Col span={20}>
          <Card style={{ width: "100%" }}>
            <AutoComplete
              dataSource={options}
              size="large"
              style={{ width: "100%" }}
              placeholder="Podaj miasto"
              onSearch={this.onSearch}
              onSelect={this.onSelect}
            >
              <Input
                suffix={
                  <Icon type="search" className="certain-category-icon" />
                }
              />
            </AutoComplete>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ width: "100%", height: "100%" }}>
            <Button
              type="primary"
              shape="circle"
              icon="environment-o"
              size={"large"}
              style={{ margin: "0px 10px" }}
              onClick={this.props.setCurrentPositionByGeolocation}
            />
            Znajdź mnie
          </Card>
        </Col>
      </Row>
    );
  }
  componentDidMount() {
    // this.props.setAvalibleCitiesByMock();
  }
  onSearch = debounce(500, this.props.fetchCities);
  onSelect (val) {
    console.warn(val);
  }
}

const mapStateToProps = state => ({
  citiesAvalible: state.locationFinder.citiesAvalible,
  currentPosition: state.locationFinder.currentPosition
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAvalibleCitiesByMock,
  setCurrentPositionByGeolocation,
  fetchCities
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityFinder);
