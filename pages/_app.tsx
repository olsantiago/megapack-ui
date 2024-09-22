import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import NavigationBar from "../src/components/NavigationBar";
import "../src/styles/main.scss";

/* eslint react/prop-types: 0 */
function App({ Component, pageProps }) {
  return (
    <>
      <NavigationBar />
      <Container fluid>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
export default App;
