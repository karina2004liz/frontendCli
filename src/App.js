import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import Signin from "./components/register";
import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {history} from "./services/history"
import PrivateRouter from './privateRoutes'
import logo from './logo.svg'

const { Header, Content, Footer } = Layout;

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
 // const [out, setOut] = useState(false)
  console.log(currentUser);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

 

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined)

  };

  return (
    <div className="principalContainer">
      <Layout className="layout">
        <Header style={{ textAlign: "left" }}>
          <div className="logo" ><img src={logo} className="App-logo" alt="logo" /></div>

          {currentUser ? (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="3">
                <Link onClick={logOut} to={"/"} className="nav-link">
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={"/singin"} className="nav-link">
                  Register
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
          
            <Switch history={history}>
              <PrivateRouter exact path="/home" component={Home} />
              <Route exact path="/" component={Login} />
              <Route exact path="/singin" component={Signin} />
            </Switch>
           
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>WebApp to Clivo</Footer>
      </Layout>
    </div>
  );
};

export default App;
