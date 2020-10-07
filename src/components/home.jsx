import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import 'antd/dist/antd.css';
import "./login.css"
import { Tabs } from 'antd';
import Profile from "./profile"
import Parkings from "./parkinglist"
import Users from "./users"
import Transactions from "./transactions"
import Reports from "./reports"
import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
    HomeTwoTone
  } from '@ant-design/icons';
const { TabPane } = Tabs;




const Home = (props) => {

    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.token)
       
             
    return (
        <div>

          
       
        <Tabs  defaultActiveKey="1" tabPosition={"left"} style={{ height: "100%" }}>
        
        <TabPane tab="Profile" key={1} >
            <Profile props={currentUser.user} />
            
        </TabPane>
          <TabPane tab="Parkings" key={2} >
            <Parkings props= {currentUser.token}/>
          </TabPane>
          <TabPane tab="Users" key={3} >
            <Users/>
          </TabPane>
          <TabPane tab="Transactions" key={4} >
            <Transactions/>
          </TabPane>
          <TabPane tab="Report" key={5} >
            <Reports/>
          </TabPane>
        
      </Tabs>
        
  
        </div>
      );

        

 
  };
  
  export default Home;