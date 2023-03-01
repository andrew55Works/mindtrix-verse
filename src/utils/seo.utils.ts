import {
  BreadcrumbJsonLd,
  BreadcrumbSubLevels,
} from '../redux/breadcrumb/breadcrumb.interface';
import { NextSeoProps } from 'next-seo';
import { OpenGraphMedia } from 'next-seo/lib/types';
import _DOMParser from 'dom-parser';
import { getFrontendMindtrixWebDomain } from './config.web.utils';
import { PAGE_URL } from './page-router.utils';

const context = 'https://schema.org';

export const JSON_LD = {
  getBreadcrumb: (p: BreadcrumbSubLevels): BreadcrumbJsonLd => {
    const base = 'https://alpha-app.mindtrix.xyz';
    const level1 = 'marketplace';
    const itemType = 'ListItem';
    const creatorId = p?.creator?.id ?? '';
    const creatorName = p?.creator?.name ?? creatorId;
    const creationId = p?.creation?.id ?? '';
    const creationName = p?.creation?.name ?? creationId;
    const obj = {
      '@context': context,
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': itemType,
          position: 1,
          name: 'Marketplace',
          item: `${base}/${level1}`,
        },
        {
          '@type': itemType,
          position: 2,
          name: creatorName,
          item: `${base}/${level1}/${creatorName}`,
        },
        {
          '@type': itemType,
          position: 3,
          name: creationName,
          item: `${base}/${level1}/${creatorName}/${creationName}`,
        },
      ],
    };
    return obj;
  },
};

export const splitShowGuidAndNameFromPath = (showGuidWithName: string) => {
  const array = showGuidWithName?.split('--') ?? [''];
  const isArraySizeOverZero = (array?.length ?? 0) > 0;
  const isArraySizeOverOne = (array?.length ?? 0) > 1;
  const id = isArraySizeOverZero ? array[0] : '';
  // if the array size is 1, the showGuid will be the showName
  const name = isArraySizeOverOne ? array[1] : id;

  return {
    id,
    name,
  };
};
export const getDefaultSeoConfig = (siteSubURL: string, locale: string) => {
  const frontEndMindtrixDomain = getFrontendMindtrixWebDomain();
  return {
    ico: '/ico/mindtrix-favicon.ico',
    apple_touch_icon: '/ico/apple-touch-icon.png',
    manifest: 'ico/site.webmanifest',
    images: [
      {
        alt: 'Mindtrix',
        // 建議大小 1200 x 630
        height: 120,
        width: 120,
        url: `${frontEndMindtrixDomain}/svg/mindtrix_logo_square_200x200.svg`,
      },
    ],
    site_url: `${frontEndMindtrixDomain}/${locale}${siteSubURL}`,
    site_name: 'Mindtrix',
  };
};
export const getSeoConfig = (locale: string): NextSeoProps => {
  const seo = getDefaultSeoConfig(PAGE_URL.collectors_marketplace.path, locale);
  // const i18n = nextI18Next.i18n;
  // const title = !!titleReplace ? titleReplace : i18n.t('default_title');
  const title = 'Mindtrix';
  // const description = i18n.t('default_title');
  const description = 'Support creations with ease';
  return {
    additionalLinkTags: [
      {
        rel: 'icon',
        href: seo.ico,
      },
      {
        rel: 'apple-touch-icon',
        href: seo.apple_touch_icon,
        sizes: '180x180',
      },
      {
        rel: 'manifest',
        href: seo.manifest,
      },
    ],
    description,
    openGraph: {
      type: 'website',
      url: seo.site_url,
      title,
      description,
      images: seo.images,
    },
    title,
  };
};

export const getEssencePageSEO = (
  title: string,
  description: string,
  images: Array<OpenGraphMedia>,
  siteSubURL: string,
  locale: string,
): NextSeoProps => {
  const seo = getDefaultSeoConfig(siteSubURL, locale);
  return {
    additionalLinkTags: [
      {
        rel: 'icon',
        href: seo.ico,
      },
      {
        rel: 'apple-touch-icon',
        href: seo.apple_touch_icon,
        sizes: '180x180',
      },
      {
        rel: 'manifest',
        href: seo.manifest,
      },
    ],
    openGraph: {
      type: 'website',
      url: seo.site_url,
      title,
      description,
      images,
    },
    twitter: {
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    },
  };
};

export const stripHTMLToText = (htmlStr: string) => {
  const docs = new _DOMParser()
    .parseFromString(htmlStr)
    .getElementsByTagName('p');

  return docs?.map((doc) => doc?.textContent ?? '').join('') ?? '';
};
