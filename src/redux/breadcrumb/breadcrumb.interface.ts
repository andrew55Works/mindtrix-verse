import { getFrontendMindtrixWebDomain } from '../../utils/config.web.utils';
import {PAGE_URL} from "../../utils/page-router.utils";

export interface BreadcrumbJsonLd {
  '@context': string;
  '@type': string;
  itemListElement: Array<BreadcrumbListItemJsonLd>;
}

export interface BreadcrumbJsonLdState {
  '@context': string;
  '@type': string;
  positionObj: {
    [position: string]: BreadcrumbListItemJsonLd;
  };
}

export const breadcrumbJsonLdStateDefault = (): BreadcrumbJsonLdState => {
  const base = getFrontendMindtrixWebDomain();
  const level1 = PAGE_URL.collectors_marketplace.name;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    positionObj: {
      '1': {
        '@type': 'ListItem',
        name: level1,
        item: `${base}/${level1}`,
        position: 1,
      },
    },
  };
};

export interface BreadcrumbListItemJsonLd {
  '@type': string;
  item: string;
  name: string;
  position: number;
}

export interface BreadcrumbListItemProps {
  id: string;
  name: string;
}

export interface BreadcrumbSubLevels {
  creation: BreadcrumbListItemProps;
  creator: BreadcrumbListItemProps;
}
