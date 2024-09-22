import React from "react";
import styles from "./index.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useMegapackInformation } from "../megapackContext";
import { amountToDollars } from "../../../utilities/formatter";
import { MegapackData } from "../../../types";
import InputNumber from "./InputNumber";

function MegapackSelector() {
  const DIMENSION_MAX_WIDTH = 100;
  const DIMENSION_MAX_LENGTH = 120;

  const {
    currentItem,
    currentItems,
    setCurrentItem,
    currentQuantity,
    setCurrentQuantity,
    currentDimensions,
    setCurrentDimensions
  } = useMegapackInformation();

  const [maxItemCap, setMaxItemsCap] = React.useState<number>(0);
  const totalMWH: number = Number(currentQuantity) * (currentItem?.energy || 0);
  const numberOfTransformers: number = Math.floor(Number(currentQuantity) / 4);

  function estimatedPrice(): string {
    const price = Number(currentQuantity) * (currentItem?.cost || 0);
    const transformer = transformerAmount();

    return amountToDollars(price + transformer);
  }

  function transformerAmount(): number {
    const found = currentItems.find((item) => item.type === "transformer");
    const price = (found?.cost || 0) * numberOfTransformers;
    return Number(price);
  }

  // removes transformers from select options
  function noTransformerList(list: Array<MegapackData>) {
    return list.filter((item) => item.type !== "transformer");
  }

  function onSelectChangeData(event: React.ChangeEvent<HTMLSelectElement>): void  {
    const found = currentItems.find((item) => item.key === event.target.value);
    if(found) {
      setCurrentItem(found);
    }
  }

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const isMaxed = Number(event.target.value) >= maxItemCap;
    if(isMaxed) {
      setCurrentQuantity(maxItemCap);
    } else {
      setCurrentQuantity(event.target.value);
    }
    setCurrentQuantity(event.target.value);
  }

  function handleDimensionsChange(event: React.ChangeEvent<HTMLInputElement>): void {
    let value: number | string = event.target.value;
    if(event.target.name === "length") {
      if(Number(event.target.value) >= DIMENSION_MAX_LENGTH) {
        value = DIMENSION_MAX_LENGTH;
      }
    } else {
      if(Number(event.target.value) >= DIMENSION_MAX_WIDTH) {
        value = DIMENSION_MAX_WIDTH
      }
    }
    setCurrentDimensions(prev => ({
      ...prev,
      [event.target.name]: value
    }))
  }

  // Compute the maximum items that can fit with current dimension
  const computeMaxItems = React.useCallback(() => {
    const offset = 10;
    const maxItemWidth = Number(currentItem.floor_dimension.width) + offset;
    const maxItemLength = Number(currentItem.floor_dimension.length) + offset;

    const maxWidth = Math.floor(Number(currentDimensions.width) / maxItemWidth);
    const maxLength = Math.floor(Number(currentDimensions.length) / maxItemLength);
    setMaxItemsCap(maxWidth * maxLength);
  }, [currentItem, currentDimensions]);

  React.useEffect(() => {
    computeMaxItems();
  }, [currentItem, currentDimensions, computeMaxItems, maxItemCap])

  return (
    <div className={styles.content}>
      <div className={styles.main}>
        <h2>Select Megapack</h2>
        <p>Megapack enables low-cost, high-density commercial and utility projects at large scale. It ships ready to install with fully integrated battery modules, inverters, and thermal systems.</p>
      </div>
      <Row className="text-center mb-4">
        <Col xs={12}>
          <h3>{totalMWH} MWh</h3>
          <span className="d-block">Energy</span>
        </Col>
      </Row>

      <Row className={styles.selectors}>
        <Col xs={5}>
          <p>Megapack Quantity</p>
        </Col>
        <Col xs={7} className={styles.alignRight}>
          <InputNumber name="quantity" min={1} max={maxItemCap} value={currentQuantity} onChange={handleQuantityChange}/>
        </Col>
      </Row>

      <Row className={styles.selectors}>
        <Col xs={5}>
          <p>Megapack Item</p>
        </Col>
        <Col xs={7} className={styles.alignRight}>
          {currentItems.length > 0 &&
            <Form.Select onChange={onSelectChangeData}>
              {noTransformerList(currentItems).map((item) =>
                <option key={item.key} value={item.key}>{item.name}</option>
              )}
            </Form.Select>
          }
        </Col>
      </Row>

      <Row className={styles.selectors}>
        <Col xs={3}>
          <p>Dimensions</p>
        </Col>
        <Col xs={9} className={styles.alignRight}>
          <div className="d-inline-flex align-items-center justify-content-center mx-1">
            <Form.Label className="mb-0 me-1">L</Form.Label>
            <InputNumber name="length" min={50} max={DIMENSION_MAX_LENGTH} value={currentDimensions.length} onChange={handleDimensionsChange}/>
          </div>
          <span className="mx-2">X</span>
          <div className="d-inline-flex align-items-center justify-content-center mx-1">
            <Form.Label className="mb-0 me-1">W</Form.Label>
            <InputNumber name="width" min={50} max={DIMENSION_MAX_WIDTH} value={currentDimensions.width} onChange={handleDimensionsChange}/>
          </div>
        </Col>
      </Row>

      <Row className={styles.details}>
        <Col xs={6}>
          <p>Estimated Price</p>
          <span>Subject to change <br />Taxes and installation not included</span>
        </Col>
        <Col xs={6} className={styles.alignRight}>
          <p>{estimatedPrice()}</p>
        </Col>
      </Row>

      <Row className={styles.details}>
        <Col xs={6}>
          <p><strong>Transformer</strong></p>
          <span>Every 4 battery will need a transformer</span>
        </Col>
        <Col xs={6} className={styles.alignRight}>
          <p>{amountToDollars(transformerAmount())}</p>
        </Col>
      </Row>

      <Row className={styles.details}>
        <Col xs={6}>
          <p>Est. Annual Maintenance</p>
          <span>Price escalates at 2% per year</span>
        </Col>
        <Col xs={6} className={styles.alignRight}>
          <p>{amountToDollars(29610)}</p>
        </Col>
      </Row>

      <Row className={styles.details}>
        <Col xs={6}>
          <h3>Due Today</h3>
          <span>Non-refundable Reservation Deposit</span>
        </Col>
        <Col xs={6} className={styles.alignRight}>
          <p><strong>{amountToDollars(1000)}</strong></p>
        </Col>
      </Row>
    </div>
  );
}

export default MegapackSelector;
