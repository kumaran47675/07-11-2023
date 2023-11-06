import { Collapse } from 'antd';
import Tinting from './Forms/TintingBanco';
import ColourantBanco from './Forms/ColourantBanco';
import UploadFileComponent from './Asset';
import { useEffect, useState } from 'react';
import './FillPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const FillPage = ({ userId, setRequestId, requestId }) => {
  const [activeKey, setActiveKey] = useState('1');
  const [isTintingPressed, setIsTintingPressed] = useState(false);
  const [isColourantPressed, setIsColourantPressed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      label: <h2 style={{ margin: '0' }}>TINTING</h2>,
      children: <Tinting userId={userId} setRequestId={setRequestId} requestId={requestId}  />,
      expandIconPosition: 'end',
    },
  ];

  useEffect(() => {
    if (isTintingPressed) {
      setActiveKey('2');
    } else if (isColourantPressed) {
      setActiveKey('3');
    } else {
      setActiveKey('1'); // Close all panels if neither isTintingPressed nor isColourantPressed
    }
  }, [isTintingPressed, isColourantPressed]);

  useEffect(() => {
    if (location.state) {
      const { isTintingPressed: newTintingPressed, isColourantPressed: newColourantPressed } = location.state;
      setIsTintingPressed(newTintingPressed || false);
      setIsColourantPressed(newColourantPressed || false);
    }
  }, [location.state]);

  if (isTintingPressed) {
    // Add Colourant panel if the record with key "Maxx Shogun" is pressed
    items.push({
      key: '2',
      label: <h2 style={{ margin: '0' }}>COLOURANT</h2>,
      children: <ColourantBanco userId={userId} requestId={requestId} />,
    });
  }

  if (isColourantPressed) {
    // Add Asset panel if the record with key "MAXX Matex" is pressed
    items.push({
      key: '3',
      label: <h2 style={{ margin: '0' }}>ASSET</h2>,
      children: <UploadFileComponent />,
    });
  }

  return (
    <>
      <Collapse className="custom-collapse" activeKey={activeKey} expandIconPosition="right">
        {items.map((item) => (
          <Collapse.Panel key={item.key} header={item.label}>
            {item.children}
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
};

export default FillPage;