import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Row, Col, Alert, Modal } from "react-bootstrap";
import { useDropzone } from 'react-dropzone'
import { FaFileExcel } from "react-icons/fa";
import axios from 'axios';
import { USER_API } from '../api'

const Uploader = () => {

  
    const [show, setShow] = useState(false);

    const handleClick = () => {

        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        formData.append("timestamp", (Date.now() / 1000) | 0);
        axios.post(`${USER_API}/api/upload`, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(messages => {
            messages.data = messages.data.map(message => {
                if (message.type === "Error") {
                    message.type = "danger";
                    return message;
                }
                if (message.type === "Success") {
                    message.type = "success";
                    return message;
                }
                if (message.type === "Warning") {
                    message.type = "warning";
                    return message;
                }
                return message;
            })
            setMessages(messages.data);
            setShow(false);
        });
        setShow(true);

    };


    let [messages, setMessages] = React.useState(null);
    const { acceptedFiles, rejectedFiles, getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });



    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            <h5>{file.path} - {file.size} bytes</h5>
        </li>
    ));

    const rejectedFilesItems = rejectedFiles.map(file => (
        <li key={file.path}>
            <h5>{file.path} - {file.size} bytes</h5>
        </li>
    ));

    return (
        <>
            <div>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input accept="" {...getInputProps()} />
                            {!isDragActive && <div id="fileUpload" className="text-center"> <FaFileExcel size={28} />   Drag and drop or click to select manager input file</div>}
                            {isDragActive && !isDragReject && <div id="fileUpload" className="text-center"> <FaFileExcel size={28} />   Drop the file in the upload area</div>}
                            {isDragReject && <div id="fileUpload" className="text-center"> <FaFileExcel size={28} />   Only spreadsheet (.xlsx) files are accepted</div>}
                        </div>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row>
                    <Col md={4}></Col>
                    <Col className="text-center" md={4}>
                        {acceptedFileItems.length > 0 && <aside style={{ paddingTop: "10px" }}>
                            <h5 style={{ fontWeight: "bold" }}>Selected File</h5>
                            <ul>{acceptedFileItems}</ul>
                        </aside>}
                        {rejectedFilesItems.length > 0 && <aside style={{ paddingTop: "10px" }}>
                            <h5 style={{ fontWeight: "bold", color: "red" }}>Cannot accept the file. Only a CSV (.csv) files are allowed</h5>
                        </aside>}
                    </Col>
                    <Col md={4}></Col>
                </Row>

                
                <Row>
                    <Col md={4}></Col>
                    <Col className="text-center" md={4}>
                        <Button id="uploadBtn" type="button" disabled={acceptedFileItems.length > 0 && !show ? '' : 'disabled'} onClick={handleClick}>Upload File</Button>
                    </Col>
                    <Col md={4}></Col>
                </Row>


                {messages && messages.map((message, idx) => (
                    <Row>
                        <Col>
                            <Alert key={idx} variant={message.type}>
                                <small>{message.message}{' '}</small>
                            </Alert>
                        </Col>
                    </Row>
                ))}
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        File Validation Alert!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Your file will now be evaluated for any errors or inconsistencies. This could take up to a minute.  
                        This window will close automatically and you will receive a confirmation or corrections to make after the evaluation is complete. 
                        Alternately you can close this window and wait for a confirmation
                    </p>
                    <p className="text-center"><img src={`../../loading.gif`} alt="Loading..."/></p>
                </Modal.Body>
            </Modal>
        </>
    );
}

Uploader.propTypes = {
    messages: PropTypes.array
}

export default Uploader;