import React, { useEffect, useState } from "react";
import UserServices from "../services/user.service";
import "antd/dist/antd.css";
import "./login.css";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";

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
            let title = `Ticket: ${el.ticket}`;
            return (
              <Col key={el.id} span={8}>
                <Card
                  key={el.id}
                  style={{ height: 300, width: "90%", "margin-top": "10%" }}
                  title={title}
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
