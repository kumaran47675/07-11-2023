import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Table.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';

const TintingTable = () => {
  const [searchText, setSearchText] = useState('');
  const [data,setData]=useState([]);
  
    useEffect(() => {
        axios
          .get(`https://localhost:7206/api/tintings/get`)
          .then((response) => {
            setData(response.data.map((item)=>({
                key:item.requestId,
                status:getStatusLabel(item.status),
                nameOfTheProject:item.nameOfTheProject,
                nameOfSalesPerson:item.nameOfSalesPerson,
                fandeck:item.fandeck,
                shadeCode:item.shadeCode,
                colourShade:item.colourShade,
                shadeName:item.shadeName,
                product:item.product,
                base:item.base,
                baseBatchNo:item.baseBatchNo,
                formulationFor1LitrePackSize:item.formulationFor1LitrePackSize,
                quantityTintedInLitres:item.quantityTintedInLitres,
                reference:item.reference,
                forProjectOrRetail:item.forProjectOrRetail,
                forSMProjectOrRetailOrBuka:item.forSMProjectOrRetailOrBuka,
                shadeMatchConfirmation:item.shadeMatchConfirmation ? "True" : "False",
                shadePatch:item.shadePatch,
                otherObservations:item.otherObservations,
                dispensingMachine:item.dispensingMachine,
                tintingInvoice:item.tintingInvoice,
                originalInvoice:item.originalInvoice,
                date:item.date
            }))); 
           
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            console.log(data)// Use response.data directly
            
          });
      }, [data]);

      function getStatusLabel(status) {
        if (status === 1) {
            return 'Tinting Completed';
        } else if (status === 2) {
            return 'Colourants Completed';
        } else if (status === 3) {
            return 'Request Completed';
        } else {
            return 'Unknown Status';
        }
    }
      const columns = [
        {
          title: 'Status',
          dataIndex: 'status',
          
        },
        {
          title: 'Date',
          dataIndex: 'date',
          
        },
    
        {
          title: 'Name of the Project',
          dataIndex: 'nameOfTheProject',
          
        },
        {
          title: 'Name Of Sales Person',
          dataIndex: 'nameOfSalesPerson',
          
        },
        {
          title: 'Fandeck',
          dataIndex: 'fandeck',
          
        },
        {
          title: 'Shade Code',
          dataIndex: 'shadeCode',
          
        },
        {
          title: 'Colour Shade',
          dataIndex: 'colourShade',
          
        },
        {
          title: 'Shade Name',
          dataIndex: 'shadeName',
          
        },
        {
          title: 'Product',
          dataIndex: 'product',
          
        },
        {
          title: 'Base',
          dataIndex: 'base',
          
        },
        {
          title: 'Base Batch No',
          dataIndex: 'baseBatchNo',
          
        },
        {
          title: 'Formulation For 1 Litre PackSize',
          dataIndex: 'formulationFor1LitrePackSize',
          
        },
        {
          title: 'Quantity Tinted In Litres',
          dataIndex: 'quantityTintedInLitres',
          
        },
    
        {
          title: 'Reference',
          dataIndex: 'reference',
          
        },
        {
          title: 'For Project Or Retail',
          dataIndex: 'forProjectOrRetail',
          
        },
        {
          title: 'For SMProject Or Retail Or Buka',
          dataIndex: 'forSMProjectOrRetailOrBuka',
          
        },
        {
          title: 'Shade Match Confirmation',
          dataIndex: 'shadeMatchConfirmation',
          
        },
        {
          title: 'Shade Patch',
          dataIndex: 'shadePatch',
          
        },
        {
          title: 'Other Observations',
          dataIndex: 'otherObservations',
          
        },
        {
          title: 'Dispensing Machine',
          dataIndex: 'dispensingMachine',
          
        },
    
        {
          title: 'TintingInvoice',
          dataIndex: 'tintingInvoice',
          
        },
    
        {
          title: 'OriginalInvoice',
          dataIndex: 'originalInvoice',
          
        },
    
    
    
      ];


  const navigate = useNavigate();

  const handleSearch = value => {
    setSearchText(value);
  };

  const handleRowClick = (record) => {
    const { key, status } = record;
  
    if (status === 'Tinting Completed') {
      navigate('/colourant', { state: { recordKey: key,  isTintingPressed: true } });
    } else if (status === 'Colourants Completed') {
      navigate('/asset', { state: { recordKey: key,  isColourantPressed: true } });
    }
  };

  const filteredDataSource = data.filter(
    (record) =>
      (record.status.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.date && record.date.includes(searchText)) ||
      (record.nameOfTheProject &&
        record.nameOfTheProject.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.nameOfSalesPerson &&
        record.nameOfSalesPerson.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.fandeck && record.fandeck.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.shadeCode && record.shadeCode.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.colourShade &&
        record.colourShade.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.shadeName && record.shadeName.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.product && record.product.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.base && record.base.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.baseBatchNo &&
        record.baseBatchNo.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.formulationFor1LitrePackSize &&
        record.formulationFor1LitrePackSize.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.quantityTintedInLitres &&
        record.quantityTintedInLitres.toString() === searchText) ||
      (record.reference && record.reference.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.forProjectOrRetail &&
        record.forProjectOrRetail.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.forSMProjectOrRetailOrBuka &&
        record.forSMProjectOrRetailOrBuka.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.shadeMatchConfirmation &&
         record.shadeMatchConfirmation===searchText) ||
      (record.shadePatch && record.shadePatch.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.otherObservations &&
        record.otherObservations.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.dispensingMachine &&
        record.dispensingMachine.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.tintingInvoice && record.tintingInvoice.toLowerCase().includes(searchText.toLowerCase())) ||
      (record.originalInvoice &&
        record.originalInvoice.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <>
      <div className='tableheader'>
        <h2 style={{ textAlign: 'center', width: 'auto' }}>TINTING</h2>
        <div className='tablebtn'>
          
          <Input
            placeholder='Search'
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            style={{ marginRight: '8px', width: '200px' }}
            prefix={<SearchOutlined />}
          />
          <Link to='/tinting'>
            <Button type='primary' style={{ width: '100px' }}>
              New
            </Button>
          </Link>
        </div>
      </div>
      <div className='tablecontainer'>
        <Table
          columns={columns}
          dataSource={filteredDataSource}
          pagination={{
            // style: {
            //   display: 'flex',
            //   justifyContent: 'center',
            // },
            pageSize: 5,
          }}
        

          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
    </>
  );
};

export default TintingTable;