import React from "react";
import styles from "./index.module.scss";
import { useMegapackInformation } from "../megapackContext";

function Item() {
  const { currentItem } = useMegapackInformation();

  const cubeStyle = (): { [key: string]: string } => ({
    ["--data-megapack-width"]: `${(Number(currentItem.floor_dimension.width) * 10) + 300}px`,
  });

  return (
    <div className={styles.cube} style={cubeStyle()}>
      <div className={`${styles.face} ${styles.front}`}></div>
      <div className={`${styles.face} ${styles.left}`}></div>
      <div className={`${styles.face} ${styles.top}`}></div>
      <div className={`${styles.face} ${styles.bottom}`}></div>
      <div className={`${styles.face} ${styles.right}`}></div>
      <div className={`${styles.face} ${styles.back}`}></div>
    </div>
  );
}

export default Item;
