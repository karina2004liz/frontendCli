import React, { useEffect, useState } from "react";
import UserServices from "../services/user.service";
import "antd/dist/antd.css";
import "./login.css";
import { Spin } from "antd";
import { Card, Col, Row } from "antd";

const Parking = (props) => {
  console.log(props.props);

  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getParkings().then((data) => {
      console.log(data.data);
      setParkings(data.data);
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
        {parkings !== undefined &&
          parkings.map((el) => {
            return (
              <Col key={el.id} span={8}>
                <Card
                  style={{ height: 250, "margin-top": "10%" }}
                  title={el.name}
                  bordered={true}
                >
                  <p>{el.id}</p>
                  <p>
                    <b>{el.address}</b>
                  </p>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Parking;
