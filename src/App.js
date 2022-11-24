import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function App() {

  const [selectedImage, setSelectedImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    if (!selectedImage) {
      setPreviewImage(undefined);
      return;
    }

    const ou = URL.createObjectURL(selectedImage)
    setPreviewImage(ou);

    return () => URL.revokeObjectURL(ou);
  }, [selectedImage]);

  const changeHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    
    setSelectedImage(e.target.files[0]);
  }

  return (
    <div className="App py-5">
      <Container className='text-start'>
        <Row className='justify-content-center'>
          <Col xs='12' md='8'>

            {previewImage && (
              <div className='my-3'>
                <img src={previewImage} alt='' />
              </div>
            )}

            <Form>
              <FormGroup>
                <Label for="uploadFile">
                  File
                </Label>

                <Input
                  id="uploadFile"
                  name="file"
                  type="file"
                  accept="image/*"
                  capture
                  onChange={changeHandler}
                />
                <FormText>
                  This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
