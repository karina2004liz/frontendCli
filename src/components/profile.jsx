import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Descriptions } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = (props) =>{
    console.log(props.props)

    const {name, phone, email, _id} = props.props

    return(
        <div className="site-card-wrapper">
            <center >

            <Avatar src="https://i0.wp.com/wipy.tv/wp-content/uploads/2020/08/nueva-imagen-de-la-secuela-de-avatar.jpg?w=1000&ssl=1"  size={150}  />
            
        <Descriptions column={2}  bordered={true} style={{"paddingTop":"5%"}} title="User Info">
        <Descriptions.Item  label="UserName">{name}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{phone}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item  label="Id">{_id}</Descriptions.Item>
      </Descriptions>
      </center>
      </div>

    )

}

export default Profile