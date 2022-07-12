import React, { useState, useCallback } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { createLicense } from '../graphql/mutations'
import './AddAssests.css';
import {Typography } from '@material-ui/core';
import Routes from "../Routes";
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { useHistory } from 'react-router-dom';

function AddAssests() {

  const [inputs, setInputs] = useState({purchaseType: "MARKETPLACE_PUBLIC"});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
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
    <div className="AddAssests">
      <Typography gutterBottom variant="h3" align="center">
        Add Asset
      </Typography>   
      <div className = "entire">

      <form style={{textAlign: 'center' }}  onSubmit={handleSubmit}>
      
      <label>Name:
      <input 
        type="text" 
        name="name"
        value={inputs.name || ""} 
        onChange={handleChange}
      /> 
      </label>
      <label>Category:
      <input 
        type="text" 
        name="category" 
        value={inputs.category || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Renewal Date:
        <input 
          type="date" 
          name="renewalDate" 
          value={inputs.renewalDate || ""} 
          onChange={handleChange}
        />
      </label>

      <div className = "purchase">
      <label for="purchaseType"> Purchase Type:
          <select  id="purchaseType" name="purchaseType"  value={inputs.purchaseType} onChange={handleChange}> 
            <option selected value="MARKETPLACE_PUBLIC">MARKETPLACE_PUBLIC</option>
            <option value="MARKETPLACE_PRIVATE">MARKETPLACE_PRIVATE</option>
            <option value="DIRECT_VENDOR">	DIRECT_VENDOR</option>
          </select> 
      </label>
      </div>

      <label>License Terms:
        <input 
          type="text" 
          name="licenseTerms" 
          value={inputs.licenseTerms || ""} 
          onChange={handleChange}
        /> 
      </label>
      
      <label>Comments:
        <input 
          type="text" 
          name="comments" 
          value={inputs.comments || ""} 
          onChange={handleChange}
        />
      </label>
      <br />
        <input type="Submit" />
      </form>
      </div>
    </div>
  );
}

AddAssests.propTypes = { 
}
export default AddAssests;