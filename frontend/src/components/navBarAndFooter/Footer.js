import React from "react";
import Tampere_University_logo from "../../images/Tampere_University_logo.png";
import "../../stylesheets/navBarAndFooter/footer.css";

import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer id="page-footer">
      <Container fluid>
        <Row>
          <Col sm={9}></Col>
          <Col sm={3}>
          <img 
            className="site-logo-footer float-right" 
            src={Tampere_University_logo} 
            alt="Tampereen yliopisto" 
            title="Tampereen yliopisto" />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
