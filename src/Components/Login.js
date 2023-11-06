import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import './Login.css';
import {useNavigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login({ setToken, setUserId, setUserName}) {
    const [LoginForm] = useForm();
    
    
    const onLoginClick = () => {
        
        let Input = LoginForm.getFieldValue()
        if(validate(Input["userId"],Input["password"]))
        {
            
                axios.get(`https://localhost:7206/api/login/get/${Input["userId"]}`)
                .then((response)=>{
                   
                if(response.data.length!=0)
                {
                    if(response.data[0].userId===Input["userId"])
                    {
                      if(response.data[0].password===Input["password"])
                      {
                       
                        setUserId(Input["userId"]);
                        setUserName(response.data[0].userName)
                        setToken(true);
                        window.history.pushState({}, "Dashboard", "/user");
                        
  
                      }
                      else
                      {
                        toast('Password  is incorrect', {
                          position: "top-center",
                          autoClose: 50,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          });
                      }
                    }
                    else
                    {
                      toast('UserId is incorrect', {
                        position: "top-center",
                        autoClose: 50,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    }
                }
                else
                {
                  toast('UserId is incorrect', {
                    position: "top-center",
                    autoClose: 50,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                }
                    
                    
                })
        }
       
    }
    const validate=(UserId,Password)=>{
        let result=true;
        if(UserId===''||UserId===null)
        {
          toast('UserId is incorrect', {
            position: "top-center",
            autoClose: 50,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          result=false;
        }
        if(Password===''||Password===null)
        {
          result=false;
        }
        return result;
  
      }

    return (
        <>
        <div className="LoginHeader">
                <div>
                    <img id="blobby-1" src='https://www.nipponpaint.co.in/wp-content/uploads/2021/08/Nippon-Logo-11-01-01.png' alt="Blobby" />
                </div>
        </div>
        
        <div className="LoginMainClass">
            <div className="LoginPage">
                <h2 style={{ marginBottom: '40px' }}>
                    {/* <img src={'https://www.nipponpaint.co.in/wp-content/uploads/2021/08/Nippon-Logo-11-01-01.png'} style={{ width: '200px' }} /> */}
                    LOGIN
                </h2>
                <div>
                    <Form form={LoginForm} onFinish={() => onLoginClick()}>
                        <Form.Item name={"userId"} rules={[
                            {
                                required: true,
                                message: 'Please input your UserId!',
                            }
                        ]}>
                            <Input placeholder="User Id" size="large" />
                        </Form.Item>
                        <Form.Item name={"password"} rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            }
                        ]}>
                            <Input.Password placeholder="Password" type="password" size="large" />
                        </Form.Item>
                        <Form.Item className="LoginButtonAlign" style={{marginTop:"10px"}}>
                            <Button size="large" htmlType="submit" type="primary" className="LoginButton">Login</Button>
                        </Form.Item>
                    </Form>
                </div>
                <ToastContainer/>
            </div>
         
        </div>
    </>
    )
}
export default Login;