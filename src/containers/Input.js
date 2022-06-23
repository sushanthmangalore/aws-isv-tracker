import React, { useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';
import {Table, Button, ToggleButton, ButtonGroup, ToggleButtonGroup} from 'react-bootstrap';
import axios from "axios";
import { USER_API } from '../api';
import TableButton from './helperComponents/TableButtons';

const Input = () => {

    const [licenses, setLicenses] = useState(null);
    const [checked, setChecked] = useState(false);

    // useEffect(() => {
    //     async function getLicenses ()  {
    //         try{
    //             const response = await axios.get(`${USER_API}/api/users/:id`);
    //             const json = response.json();
    //             setLicenses(json.data);
    //         } 
    //         catch{
    //             console.log("there is an error in the useEffect for dashboard props")
    //         }
    //     }
    //     getLicenses();
    // })

    // place holder for delete function to be added
    // const deleteEntry = () => {

    // }

    const licenseSeed = [
        {
            id: 1,
            name: "DataDog",
            category: "Monitoring",
            purchaseType: "MP Private Offer",
            licenseTerms: "1 year, 50 users",
            renewalDate: "7/31/2022",
            comments: "",
        },
        {
            id: 2,
            name: "Trend Micro",
            category: "Security",
            purchaseType: "MP Public Offer",
            licenseTerms: "1 year",
            renewalDate: "8/31/2022",
            comments: "Switch to private offer",
        },
        {
            id: 3,
            name: "F5",
            category: "Networking",
            purchaseType: "Direct Purchase",
            licenseTerms: "2 years",
            renewalDate: "1/31/2023",
            comments: "Discuss with AWS",
        },
        {
            id: 4,
            name: "Databricks",
            category: "Analytics",
            purchaseType: "MP Private Offer",
            licenseTerms: "$1.00 / unit",
            renewalDate: "7/31/2022",
            comments: "Renew Offer",
        },
    ]

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
                    {licenseSeed.map((license) => {
                        console.log(license.id % 2 === 0)
                        return(
                            <tr key={license.id} style={{backgroundColor: license.id % 2 === 0 ? "#fbb64e" : "#ffffff"}}>
                                <td><TableButton licenseId={license.id}/></td>
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
            <Button variant="dark" size="lg" className="float-right">Delete</Button>
        </div>
    );
};

Input.propTypes = {
    licenses: PropTypes.array
}

export default Input;