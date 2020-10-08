import React, { useState, useEffect } from "react";
import { Form, Button, Select } from "antd";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { DatePicker } from "antd";
import moment from "moment";
import { notification } from "antd";
import UserServices from "../services/user.service";
import userService from "../services/user.service";
import { Table } from "antd";
import CsvDownload from "react-json-to-csv";
import { Alert } from 'antd';


const openNotificationWithIcon = (message, description) => {
  notification.warning({
    message: message,
    description: description,
  });
};

const Reports = (props) => {
  const [loading, setLoading] = useState(false);
  const [parkings, setParkings] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    UserServices.getParkings().then((data) => {
      console.log(data.data);
      setParkings(data.data);
      setLoading(false);
    });
  }, []);

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let { firstDate, secondDate, idParking } = values;

    console.log(values);

    if (firstDate !== undefined && secondDate === undefined) {
      console.log("Está entrando al if");
      openNotificationWithIcon("Error", "Debe seleccionar fecha final");
    } else if (firstDate === undefined && secondDate !== undefined) {
      console.log("Está entrando al if");
      openNotificationWithIcon("Error", "Debe seleccionar fecha inicial");
    } else if (
      idParking !== undefined &&
      firstDate === undefined &&
      secondDate === undefined
    ) {
      setLoading(true);
      console.log("Aquí va la consilta por ID");
      console.log(idParking);
      userService.getAllbyParking(idParking).then((data) => {
        console.log(data.data.paysUser);

        setReports(data.data.paysUser);
        setLoading(false);
      });
    } else if (
      idParking === undefined &&
      firstDate !== undefined &&
      secondDate !== undefined
    ) {
      setLoading(true);
      console.log("Aquí va la función con fechas");

      firstDate = moment(firstDate).format(dateFormat);
      secondDate = moment(secondDate).format(dateFormat);

      userService.getAllbyDates(firstDate, secondDate).then((data) => {
        console.log(data.data.paysUser);

        setReports(data.data.paysUser);
        setLoading(false);
      });
    } else if (
      idParking !== undefined &&
      firstDate !== undefined &&
      secondDate !== undefined
    ) {
      setLoading(true);

      console.log("Aquí va la función con fechas y ID");

      firstDate = moment(firstDate).format(dateFormat);
      secondDate = moment(secondDate).format(dateFormat);
      userService
        .getAllByDatesAndParking(firstDate, secondDate, idParking)
        .then((data) => {
          console.log(data.data.paysUser);

          setReports(data.data.paysUser);
          setLoading(false);
        });
    }
  };

  const dateFormat = "YYYY/MM/DD";


  const columns = [
    {
      title: "Estacionamiento",
      dataIndex: "idParking",
      key: "idParking",
    },
    {
      title: "Ticket",
      dataIndex: "ticket",
      key: "ticket",
    },
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Fecha de movimiento",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  return (
    <div className="site-card-wrapper-report">
          <Alert
      message="Information"
      description="You can select transactions by date, by date and parking, or only by parking"
      type="info"
      showIcon
      closable
    /> 
      <center>
        <Form
          form={form}
          name="normal_login"
          className="login-form-report"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="firstDate" label="Seleccione fecha inicial">
            <DatePicker style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item  name="secondDate" label="Seleccione fecha final">
            <DatePicker style={{width:"100%"}} />
          </Form.Item>
          <Form.Item name="idParking" label="Seleccione Estacionamiento">
            <Select>
              {parkings !== undefined &&
                parkings.map((el) => {
                  return (
                    <Select.Option key={el.id} value={el.id}>
                      {el.name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item>
            {loading ? (
              <Spin tip="Loading..."></Spin>
            ) : (
              <div>
                <Button type="primary" htmlType="submit">
                  Consultar
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </center>
      {reports.length !== 0 && (
        <CsvDownload
          style={{
            color: "#fff",
            background: "#1890ff",
            "border-color": "#1890ff",
            border: "none",
            width: "100%",
            height: 32,
          }}
          data={reports}
          filename="report.csv"
        >
          Descargar data en CSV
        </CsvDownload>
      )}
      {reports !== undefined && (
        <Table dataSource={reports} columns={columns} />
      )}
    </div>
  );
};

export default Reports;
