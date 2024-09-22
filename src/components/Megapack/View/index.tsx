import React from "react";
import styles from "./index.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Item from "../Item";
import { useMegapackInformation } from "../megapackContext";

function View() {
  const { currentQuantity, currentDimensions, currentItem } = useMegapackInformation();
  const [currentItems, setCurrentItems] = React.useState<string[]>([]);
  const [maxColumns, setMaxColumns] = React.useState<number>(12);

  const rowStyle = (): { [key: string]: string } => ({
    ["--data-land-width"]: `${2500 * (Number(currentDimensions.width) / 100)}px`,
    ["--data-land-length"]: `${2500 * (Number(currentDimensions.length) / 100)}px`,
  });

  // Compute the maximum items that can fit with current dimension
  const computeColumns = React.useCallback(() => {
    const offset = 10;
    const columns = 12 / Math.floor(Number(currentDimensions.width) / (Number(currentItem.floor_dimension.width) + offset));
    setMaxColumns(Math.ceil(columns));
  }, [currentItem, currentDimensions]);

  // sets the number of items based on the updated data in Context
  React.useEffect(() => {
    if (Number(currentQuantity) > 0) {
      const list: string[] = [];
      for (let i = 1; i <= Number(currentQuantity); i++) {
        list.push(`item-${i}`);
      }
      setCurrentItems(list);
    }
  }, [currentQuantity]);

  React.useEffect(() => {
    computeColumns();
  }, [currentItem, currentDimensions, computeColumns])

  return (
    <Container className={styles.container} fluid>
      <Row className={styles.row} style={rowStyle()}>
        {currentItems.map((item: string) =>
          <Col xs={maxColumns} key={item} className={styles.column}>
            <Item />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default View;
