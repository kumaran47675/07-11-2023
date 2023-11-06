import {useState,useEffect} from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Table.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const ObservationTable = ({userId}) =>{
    // const [show, setShow] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        axios
          .get(`https://localhost:7206/api/observation/get`)
          .then((response) => {
            setData(response.data.map((item)=>({
                key:item.requestId,
                depot:item.depot,
                baseTintedAsPerReportInLit:item.baseTintedAsPerReportInLit,
                baseTintedAsPerHistoryFileInLit:item.baseTintedAsPerHistoryFileInLit,
                colorantPouredInCannistersInLit:item.colorantPouredInCannistersInLit,
                colorantConsumedInLit:item.colorantConsumedInLit,
                remarks:item.remarks,
                brandingForDispensingMachine:item.brandingForDispensingMachine,
                brandingForGyroshakerMachine:item.brandingForGyroshakerMachine,
               

            }))); 
           
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
          
            
          });
      }, [data]);
    const columns=[
        {
            title:"Depot",
            dataIndex:"depot"
            
        },
        {
            title:"Base Tinted As Per Report In Lit",
            dataIndex:"baseTintedAsPerReportInLit"
            
        },
        {
            title:"Base Tinted As Per History File In Lit",
            dataIndex:"baseTintedAsPerHistoryFileInLit"
            
        },
        {
            title:"Colorant Consumed In Lit",
            dataIndex:"colorantConsumedInLit"
            
        }, 
        {
            title:"Colorant Poured In Cannisters In Lit",
            dataIndex:"colorantPouredInCannistersInLit"
            
        },
        {
            title:"Remarks",
            dataIndex:"remarks"
            
        },
        {
            title:"Brandling For Dispensing Machine",
            dataIndex:"brandingForDispensingMachine"
            
        },
        {
            title:"Brandling For Gyroshaker Machine",
            dataIndex:"brandingForGyroshakerMachine"
            
        }
    ]
    

    const handleSearch = value => {
        setSearchText(value);
      };
    
      const filteredDataSource = data.filter(
        (record) =>
          (record.depot && record.depot.toLowerCase().includes(searchText.toLowerCase())) ||
          (record.baseTintedAsPerReportInLit &&
            record.baseTintedAsPerReportInLit === parseInt(searchText, 10)) ||
          (record.baseTintedAsPerHistoryFileInLit &&
            record.baseTintedAsPerHistoryFileInLit === parseInt(searchText, 10)) ||
          (record.colorantConsumedInLit &&
            record.colorantConsumedInLit === parseInt(searchText, 10)) ||
          (record.colorantPouredInCannistersInLit &&
            record.colorantPouredInCannistersInLit === parseInt(searchText, 10)) ||
          (record.remarks && record.remarks.toLowerCase().includes(searchText.toLowerCase())) ||
          (record.brandingForDispensingMachine &&
            record.brandingForDispensingMachine.toLowerCase().includes(searchText.toLowerCase())) ||
          (record.brandingForGyroshakerMachine &&
            record.brandingForGyroshakerMachine.toLowerCase().includes(searchText.toLowerCase())) 
      );  

    return (
        <>  
       <div className='tableheader'>
        <h2 style={{ textAlign: 'center', width: 'auto' }}>OBSERVATIONS</h2>
        <div className='tablebtn'>
          
          <Input
            placeholder='Search'
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            style={{ marginRight: '8px', width: '200px' }}
            prefix={<SearchOutlined />}
          />
          <Button type='primary' style={{ width: '100px' }} onClick={()=>{
                console.log(userId)
                navigate('/observationform', {state: {userId}}); 
          }} > 
                         New
          </Button>
        </div>
      </div>
      <div className='tablecontainer' style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <Table
                columns={columns}
                dataSource={filteredDataSource}
                pagination={{style:{
                    display:"flex",
                    justifyContent:"center"
                },
                    pageSize:5
                    
                }
                   
                }
                >
                
                </Table>
           

                
            </div>
        </>
    )
}

export default ObservationTable;