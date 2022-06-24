import React from 'react';
import './App.css';
import { Nav, Navbar, NavItem, Container } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


function App() {
  return (
    <div className="App App-header">
      <Navbar collapseOnSelect className="fixed-top" expand="lg" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            width="50"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{' '}
          ISV Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <LinkContainer to="/import">
              <Nav.Link>
                <NavItem>IMPORT ASSETS</NavItem>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <Nav.Link>
                <NavItem>DASHBOARD</NavItem>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/export">
              <Nav.Link>
                <NavItem>EXPORT ASSETS</NavItem>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/analysis">
              <Nav.Link>
                <NavItem>ANALYSIS</NavItem>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Routes />
      </Container>
      <Navbar fixed="bottom" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
          <div>© 2008 - 2022 Amazon Web Services, Inc. or its affiliates. All rights reserved. </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div >
  );
}

export default App;