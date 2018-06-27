import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoadWeather from "./containers/road-weather";
import Home from "./containers/home";

import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item onClick={() => this.props.toHome()} key="1">Strona główna</Menu.Item>
            <Menu.Item onClick={() => this.props.toRoadWeather()} key="2">Pogoda na drodze</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "transparent", padding: 0, minHeight: 'calc(100vh - 150px)' }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/road-weather" component={RoadWeather} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Weather App</Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toHome: () => push('/'),
  toRoadWeather: () => push('/road-weather')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(App)
