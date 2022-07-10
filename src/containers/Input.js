import React, { useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button, Modal} from 'react-bootstrap';
import { listLicenses } from "../graphql/queries";
import { deleteLicense } from "../graphql/mutations";
import { API, input } from "aws-amplify";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';



const Input = () => {


    const [licenses, setLicenses] = useState([]);
    const [licensesToDelete, setLicensesToDelete] = useState([]);
    const [show, setShow] = useState(false);


    const fetchContracts = async () => {
        const licenseData = await API.graphql({ query: listLicenses});
        const licenses = licenseData.data.listLicenses.items.filter(license => !license._deleted)
        setLicenses(licenses)
    }

    useEffect(() => {
        fetchContracts();
    }, [])

    const deleteEntry = async (licenseId) => {
        try {
            const modelToDelete = await API.graphql({ query: deleteLicense, variables: {input: {id: licenseId}}});
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
        setLicensesToDelete([]);
        setShow(false);
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSelect = (row, isSelect) => {
        if(isSelect) {
            setLicensesToDelete([...licensesToDelete, row.id]);
            console.log("licenses after adding a new one", licensesToDelete);
        } else {
            setLicensesToDelete(licensesToDelete.filter(id => id !== row.id));
            console.log("licenses after unselecting", licensesToDelete);
        }
    }

    
    const columns = [{
        dataField: 'name',
        text: 'Product Name',
        sort: true
      }, {
        dataField: 'category',
        text: 'Category',
        sort: true
      }, {
        dataField: 'purchaseType',
        text: 'Purchase Type',
        sort: true,
        style: {fontSize: '80%'}
      }, {
        dataField: 'licenseTerms',
        text: 'License Terms',
        sort: true
      }, {
        dataField: 'renewalDate',
        text: 'Renewal Date',
        sort: true
      }, {
        dataField: 'comments',
        text: 'Comments'
      },];

      const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selected: licensesToDelete,
        onSelect: handleSelect,
        hideSelectAll: true
      }

    const rowStyle = (row, rowIndex) => {
    if(rowIndex % 2 !== 0){
        return {
            backgroundColor: "#fbb64e"
        }
    }
    else{
        return {
            backgroundColor: "#ffffff"
        }
    }
    }

    const pageButtonRenderer = ({
    page,
    active,
    disable,
    title,
    onPageChange
    }) => {
    const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
    };
    const activeStyle = {};
    if (active) {
        activeStyle.backgroundColor = '#343a40';
        activeStyle.color = 'white';
        activeStyle.borderColor = '#343a40';
    } else {
        activeStyle.backgroundColor = 'white';
        activeStyle.color = '#343a40';
    }
    if (typeof page === 'string') {
        activeStyle.backgroundColor = 'white';
        activeStyle.color = '#343a40';
    }
    return (
        <li className="page-item" key={page}>
        <Button className = 'btn-dark' onClick={ handleClick } style={ activeStyle }>{ page }</Button>
        </li>
    );
    };
      
    const options = {
    sizePerPage: 8,
    hideSizePerPage: true,
    pageButtonRenderer
    }

    return (
        <div>
            <BootstrapTable 
            keyField="id" 
            data = {licenses} 
            columns = {columns} 
            rowStyle = {rowStyle} 
            selectRow={ selectRow } 
            headerClasses='column-header'
            bootstrap4={true}
            pagination={paginationFactory(options)}
            bordered={false}
            />

            {licensesToDelete.length > 0 ? <Button 
            variant="dark" 
            size="lg" 
            className="float-right"
            onClick={handleShow}
            active >Delete</Button> : <Button 
            variant="dark" 
            size="lg" 
            className="float-right"
            onClick={handleShow}
            disabled >Delete</Button>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title style={{fontSize: '130%', textAlign: 'center', fontWeight: 'bold'}}>Are you sure you want to delete these entries?</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: 'center'}}>If you are sure you want to delete these entries, push the delete button below, otherwise, click cancel.</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={deleteCheckedEntries}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

Input.propTypes = {
    licenses: PropTypes.array
}

export default Input;