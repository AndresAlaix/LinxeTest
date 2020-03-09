import React, { useState } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';

const TopHeader = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">Bowling Score</NavbarBrand>
                <Button onClick={props.onClickHandler} color="primary">New Game</Button>
            </Navbar>
        </div>
    );
}

export default TopHeader;