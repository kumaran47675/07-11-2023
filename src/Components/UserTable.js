import { useState, useEffect } from "react";
import './User.css';
import { Table, Input, Button } from 'antd';
import axios from "axios";
const User = () =>{
    const [data,setData]=useState([]);
    useEffect(() => {
        axios
          .get(`https://localhost:7206/api/master/get/`)
          .then((response) => {
            setData(response.data.map((item)=>({
                key:item.key,
                userId:item.userId,
                userName:item.userName,
                depotName:item.depotName,
                role: item.admin ? 'Admin' : 'Customer',
                status:item.status
            }))); 
           
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            console.log(data)// Use response.data directly
            
          });
      }, [data]);
    const columns = [

        {
            title: 'UserId',
            dataIndex: 'userId',
            
          },
          {
            title: 'UserName',
            dataIndex: 'userName',
            
          },
      
          {
            title: 'Depot',
            dataIndex: 'depotName',
            
          },

          {
            title: 'Role',
            dataIndex: 'role',
            
          },
          {
             title: 'Status',
             dataIndex:"status"
          }
    ]
    


    return (
        <>
            <h2>
                User Information
            </h2>
            <div className='tablecontainer'>
                <Table
                columns={columns}
                dataSource={data}
                pagination= {false}
                />
            </div>
                
        </>

    )
}

export default User;