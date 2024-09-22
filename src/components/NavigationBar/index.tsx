import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import styles from "./index.module.scss";

function NavigationBar() {
  return (
    <Navbar bg="white" data-bs-theme="white" fixed="top">
      <div className={styles.navContainer}>
        <Navbar.Brand href="/">
          <Image
            src={require("../../images/logo.png")}
            width={125}
            height={14}
            alt="logo"
          />
        </Navbar.Brand>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
