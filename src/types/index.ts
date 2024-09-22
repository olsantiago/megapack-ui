import React from "react";

//used types
export type Dimensions = {
  length: number | string;
  width: number | string;
}

export type MegapackData = {
  key: string;
  name: string;
  type: string;
  floor_dimension: Dimensions;
  energy: number;
  cost: number;
  release_date: number | null
}

export type MegapackContextType = {
  currentItem: MegapackData;
  setCurrentItem: React.Dispatch<React.SetStateAction<MegapackData>>;
  currentQuantity: number | string;
  setCurrentQuantity: React.Dispatch<React.SetStateAction<number | string>>;
  currentItems: Array<MegapackData>;
  currentDimensions: Dimensions;
  setCurrentDimensions: React.Dispatch<React.SetStateAction<Dimensions>>
}
