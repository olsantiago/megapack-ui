import React from "react";
import styles from "./index.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MegapackSelector from "./Selector";
import View from "./View";
import { MegapackProvider } from "./megapackContext";

function Megapack() {
  return (
    <MegapackProvider>
      <Container fluid className={`${styles.container} px-0`}>
        <Row className={styles.selectYourMegapackLayout}>
          <Col xs={12} md={8} xl={9} className={styles.megapackView}>
            <View />
          </Col>
          <Col xs={12} md={4} xl={3} className={`${styles.megaPackSelector} px-5`}>
            <MegapackSelector />
          </Col>
        </Row>
      </Container>
    </MegapackProvider>
  );
}

export default Megapack;
