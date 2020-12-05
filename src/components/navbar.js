import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import {FormattedMessage} from 'react-intl';



function Barra(){



    return(
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <FormattedMessage id="Main"/>
                </Navbar.Brand>
        </Navbar>   
    );
}
export default Barra;


