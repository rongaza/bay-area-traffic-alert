import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
	return (
		<div>
			<Navbar fixed="top" bg="dark" variant="dark">
				<Navbar.Brand href="#home">Bay Area Traffic Alert</Navbar.Brand>
			</Navbar>
		</div>
	);
};

export default NavBar;
