import React from "react";
import styles from "./index.module.scss";
import Form from "react-bootstrap/Form";

type Props = {
  name: string;
  min: number;
  max: number;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // eslint-disable-line no-unused-vars
}

function InputNumber({name, min, max, value, onChange}: Props) {
  const [validateReachedMax, setValidateReachMaxed] = React.useState(false);

  React.useEffect(() => {
    setValidateReachMaxed(Number(value) === max);
  }, [value, max]);

  return (
    <div className={styles.inputField}>
      <Form.Control type="number" name={name} min={min} max={max} value={value} onChange={onChange} />
      {validateReachedMax &&
        <span className={styles.error}>Reached max of {max}</span>
      }
    </div>
  );
}

export default InputNumber;
