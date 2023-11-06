import MainPage from './Components/MainPage';
import Login from './Components/Login';
import { useState } from 'react';
import './App.css';
import TintingTable from './Components/TintingTable';
import Observation from './Components/Forms/Observation';
import Tinting from './Components/Forms/TintingBanco';
import ObservationTable from "./Components/ObservationTable";
import ColourantBanco from './Components/Forms/ColourantBanco';
import FillPage from "./Components/FillPage";
import {  BrowserRouter as Router,Route, Routes } from 'react-router-dom';
function App() {
  const [token, setToken] = useState(false);
  const [userId , setUserId] = useState();
  const [userName , setUserName] = useState('');
  const [requestId,setRequestId]=useState('');
  return (
    <div className="App">
       { !token &&
        <Login setToken={setToken} setUserId={setUserId} setUserName={setUserName} />
      }
      {token &&
        <MainPage userId={userId} userName={userName} requestId={requestId} setRequestId={setRequestId}  />
      } 
     
      
    </div>
  );
}

export default App;