import { useForm } from "antd/es/form/Form";
import { Col, Row, Button, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import MainPage from "../MainPage";
const Observation = () => {
  const location = useLocation();
  const Navigate=useNavigate();
  const handleSubmit = () => {
    console.log(location.state.userId)
    let formData = FormInsert.getFieldValue();
    formData["userId"]=location.state.userId;
    console.log(JSON.stringify(formData));
    axios.post("https://localhost:7206/api/observation/post", formData)
         .then(
                toast("Data is being saved", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                })
              );
              Navigate("/observationtable")
  };

  const [FormInsert] = useForm();

  return (
    <>
       
      <div className="outercontainer">
        <h1 className="text-center">OBSERVATION</h1>
        <div className="container-fluid mt-5">
          <Form
            form={FormInsert}
            className="FormMainClass"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Row gutter={[16, 24]}>
            <Col xs={24} sm={12} md={6} lg={6}>

                <Form.Item
                  label="Depot"
                  name="depot"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a Depot",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} maxLength={20} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6} lg={6}>

                <Form.Item
                  label="Base Tinted (Report)"
                  name="baseTintedAsPerReportInLit"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the Base Tinted",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item
                  label="Base Tinted (HistoryFile)"
                  name="baseTintedAsPerHistoryFileInLit"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the Base Tinted",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item
                  label="Colourant Poured in Cannisters"
                  name="colorantPouredInCannistersInLit"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the Colourant Poured",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item
                  label="Colourant Consumed (HistoryFile)"
                  name="colorantConsumedInLit"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the Colourant Consumed",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item
                  label="Remarks"
                  name="remarks"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the Remarks",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} maxLength={500} />
                </Form.Item>
              </Col>

              <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item
                  label="Branding for Dispensing Machine"
                  name="brandingforDispensingMachine"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a Branding for Dispensing Machine",
                    },
                  ]}
                >
                  <Select style={{ width: "100%" }}>
                    <Select.Option value="">Select</Select.Option>
                    <Select.Option value="Old">Old</Select.Option>
                    <Select.Option value="New">New</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col className="gutter-box" xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item
                  label="Branding for GyroShaker Machine"
                  name="brandingforGyroShakerMachine"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a Branding for GyroShaker Machine",
                    },
                  ]}
                >
                  <Select style={{ width: "100%" }}>
                    <Select.Option value="">Select</Select.Option>
                    <Select.Option value="Old">Old</Select.Option>
                    <Select.Option value="New">New</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
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
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Observation;