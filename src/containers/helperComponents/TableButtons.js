import react, {useState} from 'react';
import{ ButtonGroup, ToggleButton} from 'react-bootstrap';

const TableButton = (props) => {

    let [checked, setChecked] = useState(false);

    return(
        <ButtonGroup className="mb-2">
            <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant="dark"
            checked={checked}
            value={props.licenseId}
            onChange={(e) => {
                console.log(e.currentTarget.value)
                setChecked(e.currentTarget.checked)}
                }
            >
            </ToggleButton>
        </ButtonGroup>
    )
}

TableButton.propTypes = {

}

export default TableButton