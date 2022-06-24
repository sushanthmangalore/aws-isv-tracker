import React, { useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';
import {Table, Button, ToggleButton, ButtonGroup, ToggleButtonGroup} from 'react-bootstrap';
import TableButton from './helperComponents/TableButtons';
import { DataStore } from '@aws-amplify/datastore';
import { License } from '../models';

const Input = () => {


    let [licenses, setLicenses] = useState([]);
    const [licensesToDelete, setLicensesToDelete] = useState([]);


    const fetchContracts = async () => {
        const models = await DataStore.query(License);
        setLicenses(models)
    }

    useEffect(() => {
        fetchContracts();
    }, [])

    const deleteEntry = async (licenseId) => {
        try {
            const modelToDelete = await DataStore.query(License, licenseId);
            DataStore.delete(modelToDelete);
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCheckedEntries = () => {
        licensesToDelete.forEach(licenseId => 
           deleteEntry(licenseId)
        )
        const newLicenseArr = licenses.filter(license => !licensesToDelete.includes(license.id));
        setLicenses(newLicenseArr);
    }

    const addLicenseToDelete = (licenseId) => {
        setLicensesToDelete([...licensesToDelete, licenseId]);
        console.log("licenses that will be deleted", licensesToDelete)
    }

    const removeLicenseToDelete = (licenseId) => {
        const newLicensesToDelete = licensesToDelete.filter(currLicenseId => licenseId !== currLicenseId);
        setLicensesToDelete(newLicensesToDelete);
    }

    return (
        <div>
            <Table hover>
                <thead style={{backgroundColor: "#e6e7ec"}}>
                     <tr>
                        <th></th>
                        <th> Name </th>
                        <th> Category </th>
                        <th> Purchase Type </th>
                        <th> License Terms </th>
                        <th> Renewal Date </th>
                        <th> Comments </th>
                     </tr>
                </thead>
                <tbody>
                    {licenses.map((license, i) => {
                        console.log(license.id % 2 === 0)
                        return(
                            <tr key={license.id} style={{backgroundColor: i % 2 !== 0 ? "#fbb64e" : "#ffffff"}}>
                                <td><TableButton licenseId={license.id} addLicenseToDelete={addLicenseToDelete} removeLicenseToDelete={removeLicenseToDelete}/></td>
                                <td>{license.name}</td>
                                <td>{license.category}</td>
                                <td>{license.purchaseType}</td>
                                <td>{license.licenseTerms}</td>
                                <td>{license.renewalDate}</td>
                                <td>{license.comments}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button 
            variant="dark" 
            size="lg" 
            className="float-right"
            onClick={deleteCheckedEntries}>Delete</Button>
        </div>
    );
};

Input.propTypes = {
    licenses: PropTypes.array
}

export default Input;