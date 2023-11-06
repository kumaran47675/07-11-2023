import React, { useState,useEffect} from "react";
import { Col, Row, Button, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ColourantBanco = ({userId,requestId}) => {
  const [Date1, setDate] = useState('');
  const [DispensingMachine, setDispensingMachine] = useState(false);
  const [MFG,setMFG]=useState(false);
  const [Depot,setDepot]=useState('');
  const [Loading,setLoading]=useState(false);
  const location=useLocation();
  const navigation=useNavigate();
 
  const handleSubmit = () =>{
    
    let formData = FormInsert.getFieldValue();
    formData["userId"]=userId
    formData["date"]= moment(formData["date"]).format('DD-MM-YYYY');
    formData["MFG"]= moment(formData["MFG"]).format('YYYY-MM-DD');
    formData["requestId"]=location.state.recordKey
    console.log(JSON.stringify(formData));
    axios.post('https://localhost:7206/api/colourants/post',formData)
    .then(()=>{
    
      toast('Data saved', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
    navigation("/tintingtable")


  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://localhost:7206/api/login/get/${userId}`)
      .then((response) => {
        console.log(response.data[0].depot);
        setDepot(response.data[0].depot);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        if (Depot === 'Bangalore') {
          setDispensingMachine(true);
          setMFG(false);
        }
        else if(Depot==='Vizag'){
          setDispensingMachine(true);
          setMFG(true);
        }
        setLoading(false);
      });
  }, [Depot]);


  const [FormInsert] = useForm();

  return (
    <>
    
      {Loading==false && <div className="container-fluid mt-5">
        <Form
          form={FormInsert}
          className="FormMainClass"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please provide a Date",
                  },
                ]}
              >
                <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} placeholder="" />
              </Form.Item>
            </Col>

            <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                label="Colourant"
                name="colourants"
                rules={[
                  {
                    required: true,
                    message: "Please provide a Colourant",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} maxLength={20} />
              </Form.Item>
            </Col>

            <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                label="BatchNo."
                name="batchNo"
                rules={[
                  {
                    required: true,
                    message: "Please provide a BatchNo.",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} maxLength={40} />
              </Form.Item>
            </Col>

            <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please provide a Quantity",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            {DispensingMachine && <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                label="Dispensing Machine"
                name="dispensingMachine"
                rules={[
                  {
                    required: true,
                    message: "Please provide a Dispensing Machine",
                  },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value="">Select</Select.Option>
                  <Select.Option value="Banco">Banco</Select.Option>
                  <Select.Option value="D180">D180</Select.Option>
                </Select>
              </Form.Item>
            </Col>}

           {MFG && <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                label="MFG"
                name="MFG"
                rules={[
                  {
                    required: true,
                    message: "Please provide the MFG Date",
                  },
                ]}
              >
                <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} placeholder="" />
              </Form.Item>
            </Col>}
          </Row>

          <Row justify="end">
            <Col className="gutter-box">
              <Form.Item className="FormButtonClass">
                <Button type="primary" danger onClick={() => FormInsert.resetFields()}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }}>
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ToastContainer/>
      </div>}
    </>
  );
};

export default ColourantBanco;