import './App.css';
import { QrReader } from 'react-qr-reader';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

function App() {

  const [selectedImage, setSelectedImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const changePreviewImage = async () => {
      if (!selectedImage.length) {
        setPreviewImage([]);
        return;
      }
  
      const toBase64 = file => new Promise((resolve, reject) => {
        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload = () => resolve(r.result);
        r.onerror = error => reject(error);
      });
  
      const initialResponse = [];
  
      for (let image of selectedImage) {
        initialResponse.push(await toBase64(image));
      }
  
      setPreviewImage([...previewImage, ...initialResponse]);
    };

    changePreviewImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const changeHandler = (e) => {   
    if (e.target.files.length) {
      setSelectedImage(e.target.files);
    }
  }

  const addImageClick = () => {
    document.getElementById('uploadFile').value = null;
    document.getElementById('uploadFile').click();
  }

  const removeAllImages = () => {
    setPreviewImage([]);
    setSelectedImage([]);
  }

  return (
    <div className="App py-5">
      <Container className='text-start'>

        <Row className='justify-content-center'>
          <Col xs='6'>
            <QrReader
              constraints={{facingMode: 'environment'}}
              onResult={(result, error) => {
                if (!!result) {
                  setQrData(result?.text);
                }
              }}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>

        {qrData && (
          <Row className='mt-4 p-3 bg-light'>
            <Col>
                <p className='mb-0 text-center'>{qrData}</p>
            </Col>
          </Row>
        )}

        <Row className='justify-content-center mt-5'>
          <Col xs='12' md='8' className='text-center'>

            <Button color='primary' onClick={addImageClick} className='me-1'>Add</Button>
            <Button onClick={removeAllImages} color='danger' outline>Remove all images</Button>

            <Form className='d-none'>
              <FormGroup>
                <Label for="uploadFile">
                  File
                </Label>

                <Input
                  id="uploadFile"
                  name="file"
                  type="file"
                  accept="image/*, capture=camera"
                  onChange={changeHandler}
                />
                <FormText>
                  This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
              </FormGroup>
            </Form>

          </Col>
        </Row>

        {previewImage && (
          <Row className='my-5'>
            {previewImage.map((o, i) => <Col key={i} xs='4' className='mt-4'><img src={o} className='mw-100' alt='' /></Col>)}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
