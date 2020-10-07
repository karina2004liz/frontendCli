import React, { useEffect, useState } from "react";
import UserServices from "../services/user.service";
import "antd/dist/antd.css";
import "./login.css";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import { Alert } from 'antd';

const Transactions = (props) => {
  console.log(props.props);

  const [transactions, settransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getTransactions().then((data) => {
      console.log(data.data);
      settransactions(data.data.Transactions);
      setLoading(false);
    });
  }, []);

  const title = (props) =>{   
    return(
    <h3 style= {{color:"white"}}>Ticket: {props}</h3>
    )
  }

  const showInfo = () =>{
      return(
        <Alert
        message="Information"
        description="You can select transactions by date, by date and parking, or only by parking"
        type="info"
        showIcon
        closable
      />         
      )
  }


  return (
    <div className="site-card-wrapper">
      {loading && (
        <center style={{ "padding-top": "25%" }}>
          <Spin size="large" tip="Loading..."></Spin>
        </center>
      )}
      <Row gutter={16}>
        {transactions !== undefined &&
          transactions.map((el) => {
           
           
            return (
                
              <Col key={el.id} span={8}>
                <Card
                  key={el.id}
                  style={{ height: 300, "margin-top": "10%" ,background:"#001529", borderRadius:"10px", color:"white"}}
                  title={title(el.ticket)}
                  bordered={true}
                >
                  <p>
                    Cantidad: <b>{el.amount}</b>
                  </p>
                  <p>
                    Fecha: <b>{el.created_at}</b>
                  </p>
                  <p>
                    Id Estacionamiento: <b>{el.idParking}</b>
                  </p>
                  <p>
                    Id Usuario: <b>{el.idUser}</b>
                  </p>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Transactions;
