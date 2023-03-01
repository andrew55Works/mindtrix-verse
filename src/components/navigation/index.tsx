import { TopNavigation } from './top-navigation.component';

export enum ProductTypeEnum {
  Creator = 'Creator',
  Collector = 'Collector',
  Village = 'Village',
}

const Navigation = {
  Top: TopNavigation,
};
export default Navigation;
export type NavigationType = typeof TopNavigation;
