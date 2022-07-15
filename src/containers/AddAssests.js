import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, } from "react-bootstrap";
import { API, graphqlOperation } from 'aws-amplify';
import { createLicense } from '../graphql/mutations';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import './AddAssests.css';
import '@aws-amplify/ui-react/styles.css';
import { useHistory } from "react-router-dom";

function AddAssests() {

const [inputs, setInputs] = useState({purchaseType: "Select"});
let history = useHistory(); 

const handleOnChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    const handleOnSubmit = async (event) => {
      event.preventDefault();
      console.log(inputs);
      history.push('/dashboard');
      await API.graphql(graphqlOperation(createLicense, {input: {
        name: inputs.name,
        category: inputs.category,
        purchaseType: inputs.purchaseType,
        licenseTerms: inputs.licenseTerms,
        renewalDate: inputs.renewalDate,
        comments: inputs.comments
  }}));
}

return (

  <Container>
    <Row>
      <Col md={{ span: 7, offset: 3 }}>
        <Form onSubmit={handleOnSubmit}>
        
        <Row>
          <Grid container justify="center">
            <h1>Add Asset</h1>
          </Grid>
        </Row>
        <hr />

        <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" align = "center">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleOnChange}
              placeholder="Product Name"
              required
            />
          </Form.Group>
          </div>

          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" align = "center">
          <Form.Group> 
            <Form.Label>Category</Form.Label>
            <Form.Control
              as = "select"
              name="category"
              value={inputs.Category}
              onChange={handleOnChange}
              placeholder="Category"
              required
            >
              <option>Select</option>
              <option>Analytics</option>
              <option>Billing</option>
              <option>Migration</option>
              <option>Monitoring</option>
              <option>Security</option>
              <option>Storage</option>
              <option>Testing</option>
              <option>Training</option>
              <option>Warehousing</option>

            </Form.Control>
          </Form.Group>
          </div>
        </div>
      
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" align = "center">
          <Form.Group>
            <Form.Label>Purchase Type</Form.Label>
            <Form.Control
              as = "select"
              name="purchaseType"
              value={inputs.purchaseType}
              onChange={handleOnChange}
              //placeholder="Purchase type"
              required
            >
              <option>Select</option>
              <option>MARKETPLACE_PRIVATE</option>
              <option>MARKETPLACE_PUBLIC</option>
              <option>	DIRECT_VENDOR</option>
            </Form.Control>
          </Form.Group>
          </div>

          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" align = "center">
          <Form.Group>
            <Form.Label>Renewal Date</Form.Label>
            <Form.Control
              type="date"
              name="renewalDate"
              value={inputs.renewalDate}
              onChange={handleOnChange}
              //placeholder="Renewal"
              required
            />
          </Form.Group>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" align = "center">
          <Form.Group>
            <Form.Label>License Terms</Form.Label>
            <Form.Control
              type="text"
              name="licenseTerms"
              value={inputs.licenseTerms}
              onChange={handleOnChange}
              placeholder="Enter the product license terms"
              required
            />
          </Form.Group>
          </div>

          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" align = "center">
          <Form.Group>
            <Form.Label>Comments</Form.Label>
            <Form.Control
              type="text"
              name="comments"
              value={inputs.comments}
              onChange={handleOnChange}
              placeholder="Enter any comments"
              required
            />
          </Form.Group>
          </div>
        </div>
        <br />

        <Grid container justify="center">
          <Button
            variant="contained"
            size = "large"
            type="submit"
          >
           Save
          </Button>
        </Grid>
        </Form>
      </Col>
    </Row>
  </Container>
);
}

export default AddAssests;