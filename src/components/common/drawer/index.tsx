import { LeftDrawerRWDContainer } from './drawer';
import { ProductTypeEnum } from '../../navigation';

export interface DrawerProps {
  backgroundColor?: string;
  productTitle: string;
  productType: ProductTypeEnum;
}

export interface LeftDrawerProps extends DrawerProps {
  onClick: () => {
    signInOrOut: () => void;
  };
}

export interface HamburgerDrawerProps extends LeftDrawerProps {}

const Drawer = {
  Left: LeftDrawerRWDContainer,
};

export default Drawer;
