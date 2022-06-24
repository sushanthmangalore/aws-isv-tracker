import react, {useState} from 'react';
import{ ButtonGroup, ToggleButton, Button} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

const TableButton = (props) => {

    let [checked, setChecked] = useState(false);

    const checkedBox = (e) => {
        console.log(e.currentTarget.value)
        setChecked(e.currentTarget.checked)
        if(e.currentTarget.checked === true){
            props.addLicenseToDelete(props.licenseId);
        }
        else{
            props.removeLicenseToDelete(props.licenseId)
        }
        console.log(checked)
    }

    return(
        <div>
            <ButtonGroup className="mb-2">
                <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="dark"
                checked={checked}
                value={props.licenseId}
                onChange={checkedBox}
                >
                </ToggleButton>
            </ButtonGroup>
        </div>
    )
}

TableButton.propTypes = {

}

export default TableButton