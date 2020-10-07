import React, { useEffect, useState } from "react";
import UserServices from "../services/user.service";
import "antd/dist/antd.css";
import "./login.css";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";
import { Modal, Button } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getUsers().then((data) => {
      console.log(data.data.Users);
      setUsers(data.data.Users);
      setLoading(false);
    });
  }, []);

  const info = (props) => {
    console.log(props);
    UserServices.getAllTransactionsByUser(props).then((data) => {
      const pays = data.data.paysUser;
      console.log(pays);
      return Modal.info({
        title: "Transacciones",
        content: (
          <div>
            {pays.length !== 0 ? (
              pays.map((el) => {
                let title = `Ticket: ${el.ticket}`;
                return (
                  <Card
                    key={el.id}
                    style={{
                      height: 250,
                      width: "90%",
                      "margin-top": "5%",
                      background: "#DCF3FD",
                    }}
                    title={title}
                    bordered={true}
                  >
                    <p>
                      Cantidad: <b>{el.amount}</b>
                    </p>
                    <p>
                      Fecha <b>{el.created_at}</b>
                    </p>
                    <p>
                      Id Estacionamiento <b>{el.idParking}</b>
                    </p>
                  </Card>
                );
              })
            ) : (
              <b>Usuario sin transacciones</b>
            )}
          </div>
        ),
        onOk() {},
      });
    });
  };

  return (
    <div className="site-card-wrapper">
      {loading && (
        <center style={{ "padding-top": "25%" }}>
          <Spin size="large" tip="Loading..."></Spin>
        </center>
      )}
      <Row gutter={16}>
        {users !== undefined &&
          users.map((el) => {
            return (
              <Col key={el.id} span={8}>
                <Card
                  style={{ height: 250, "margin-top": "10%" }}
                  title={el.name}
                  bordered={true}
                >
                  <p>{el.email}</p>
                  <p>
                    <b>{el.phone}</b>
                  </p>
                  <p>{el.id}</p>
                  <Button onClick={() => info(el.id)}>Info</Button>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Users;
