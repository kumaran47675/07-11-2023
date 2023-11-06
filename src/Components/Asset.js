import React, { useState } from "react";
import { Button, Modal } from 'antd';
import { EyeOutlined, CloseOutlined } from '@ant-design/icons';
import './Forms/Asset.css';
import { saveAs } from "file-saver";

const UploadFileComponent = () => {
  const [imgUrls, setImgUrls] = useState([]);
  const fileInputRef = React.createRef();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const uploadFiles = (event) => {
    const files = event.target.files;
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let reader = new FileReader();
      reader.onload = function () {
        uploadedUrls.push({ name: file.name, data: reader.result });
        if (uploadedUrls.length === files.length) {
          setImgUrls(uploadedUrls);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetUpload = (index) => {
    const updatedUrls = [...imgUrls];
    updatedUrls.splice(index, 1);
    setImgUrls(updatedUrls);
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setViewModalVisible(true);
  };

  const closeImageViewer = () => {
    setViewModalVisible(false);
  };

  return (
    <div>
      <div className="upload-section">
        <h2 className="text-center">Please upload the images</h2>
        <input
          type="file"
          onChange={uploadFiles}
          style={{ display: 'none' }}
          ref={fileInputRef}
          multiple
        />
        <Button type="primary" className="custom-upload-button" onClick={() => fileInputRef.current.click()}>
          Choose Files
        </Button>
        <span className="file-label">
          {imgUrls.length > 0 ? imgUrls.length + ' file(s) chosen' : 'No files chosen'}
        </span>

        <div className="uploaded-files">
          {imgUrls.map((img, index) => (
            <div key={index} className="uploaded-file">
              <span>{img.name}</span>
              <Button type="link" onClick={() => openImageViewer(index)}>
                <EyeOutlined />
              </Button>
              <Button type="link" onClick={() => resetUpload(index)}>
                <CloseOutlined />
              </Button>
            </div>
          ))}
        </div>

        <div className="upload-buttons">
          {imgUrls.length > 0 && (
            <>
              
              <Button type="primary" danger onClick={() => setImgUrls([])}>
              Reset
            </Button>
              <Button type="primary">Submit</Button>
            </>
          )}
        </div>
      </div>
      <Modal
        title="Image Viewer"
        visible={viewModalVisible}
        onOk={closeImageViewer}
        onCancel={closeImageViewer}
        width={800}
        footer={null}
      >
        {imgUrls.length > 0 && (
          <img
            src={imgUrls[currentImageIndex].data}
            alt={imgUrls[currentImageIndex].name}
            style={{ width: '100%' }}
          />
        )}
      </Modal>
    </div>
  );
};

export default UploadFileComponent;