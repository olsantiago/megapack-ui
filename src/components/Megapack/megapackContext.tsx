import React from 'react';
import { MegapackData, MegapackContextType, Dimensions } from '../../types';
import megapackItems from '../../utilities/megapackItems';

type Props = {
  children?: React.ReactNode;
}

const defaultMegapackContext: MegapackContextType = {
  currentItem: megapackItems[0],
  setCurrentItem: () => {},
  currentQuantity: 1,
  setCurrentQuantity: () => {},
  currentItems: [],
  currentDimensions: {
    length: 50,
    width: 50
  },
  setCurrentDimensions: () => {}
}

const MegapackContext = React.createContext<MegapackContextType>(defaultMegapackContext);

const MegapackProvider= ({ children }: Props) => {
  // prevent re-rendering large static values
  const currentItems = React.useMemo(() => megapackItems, []);

  const [currentItem, setCurrentItem] = React.useState<MegapackData>(defaultMegapackContext.currentItem);
  const [currentQuantity, setCurrentQuantity] = React.useState<number | string>(defaultMegapackContext.currentQuantity);
  const [currentDimensions, setCurrentDimensions] = React.useState<Dimensions>(defaultMegapackContext.currentDimensions)

  return (
    <MegapackContext.Provider
      value={{
        currentItem,
        setCurrentItem,
        currentItems,
        currentQuantity,
        setCurrentQuantity,
        currentDimensions,
        setCurrentDimensions
      }}
    >
      {children}
    </MegapackContext.Provider>
  );
}

export { MegapackProvider };

export function useMegapackInformation(): MegapackContextType {
  return React.useContext(MegapackContext);
}
