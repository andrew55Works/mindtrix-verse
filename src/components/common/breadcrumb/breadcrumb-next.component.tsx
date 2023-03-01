import React, { FC } from 'react';
import * as S from './breadcrumb-next.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import BreadcrumbSvg from '../../../assets/svg/icon_breadcrumb.svg';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { getFrontendMindtrixWebDomain } from '../../../utils/config.web.utils';
import { splitShowGuidAndNameFromPath } from '../../../utils/seo.utils';
import { PAGE_URL } from '../../../utils/page-router.utils';
import { useSelector } from 'react-redux';
import { selectCollectorProfile } from '../../../redux/collector/collector.selector';
import { initialWallet } from '../../../types/wallet.type';
import { NextRouter } from 'next/dist/shared/lib/router/router';

interface Props {
  address: string;
  href: string;
  isLast: boolean;
  router: NextRouter;
  title: string;
}
const Crumb: FC<Props> = (props) => {
  const address = props?.address ?? '';
  const href = props?.href ?? '';
  const title = props?.title ?? '';
  const isLast = props?.isLast ?? false;
  const router = props?.router ?? null;
  const collectorProfile = useSelector(selectCollectorProfile);
  const collectorWallet = collectorProfile?.wallet ?? initialWallet;
  const collectorWalletAddress = collectorWallet?.blocto?.address ?? '';

  const nftNames = router?.query?.nft_name ?? [];
  const isShowSubPathExistInMyCollection = (nftNames?.length ?? 0) >= 2;

  // TODO: Need to remove and put it in other places.
  const isNotMatchMyCollectionPath = title.toLowerCase() !== 'collection';
  const fixedTitle = !isNotMatchMyCollectionPath ? 'Collection' : title;
  const fixedHref = isNotMatchMyCollectionPath
    ? href
    : `${PAGE_URL.collectors_my.path}/${collectorWalletAddress}`;

  if (isLast) {
    // return normal text on the last cuz we're already in the page.
    return (
      <S.LI>
        <Text.h4 status={'basic'} my={2} children={fixedTitle} />
      </S.LI>
    );
  }

  const shallowPushToMyCollection = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    const myCollectionFullURL = `${PAGE_URL.collectors_my.path}/${
      address ? address : '0x'
    }`;
    router?.push(myCollectionFullURL, undefined, {
      shallow: true,
    });
  };

  const shallowPushToPodcastGroupOfMyCollection = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    if (!isShowSubPathExistInMyCollection) return;
    const showSubPath = nftNames[0];
    const myCollectionFullURL = `${PAGE_URL.collectors_my.path}/${
      address ? address : '0x'
    }/${showSubPath}`;
    router?.push(myCollectionFullURL, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <S.LI>
        <S.A
          href={isNotMatchMyCollectionPath ? fixedHref : '#'}
          onClick={
            isNotMatchMyCollectionPath
              ? isShowSubPathExistInMyCollection
                ? shallowPushToPodcastGroupOfMyCollection
                : undefined
              : shallowPushToMyCollection
          }
          target={isNotMatchMyCollectionPath ? '_blank' : '_self'}
        >
          <Text.h4 status={'basic'} my={2} children={fixedTitle} />
        </S.A>
      </S.LI>
      <S.OLSvg>
        <BreadcrumbSvg />
      </S.OLSvg>
    </>
  );
};

const _defaultGetTextGenerator = (param: string, query: ParsedUrlQuery) => null;

const generatePathParts = (pathStr: string) => {
  // Break down the path between "/"s, removing empty entities
  // Ex:"/room/nested/path" --> ["room", "nested", "path"]
  const excludePaths = ['room'];
  const replaceToGalleryPath = ['essence', 'show'];
  // Remove any query parameters, as those aren't included in breadcrumbs
  const pathWithoutQuery = pathStr.split('?')[0];
  return pathWithoutQuery
    .split('/')
    .map((v) => {
      const decodedURI = decodeURIComponent(v);
      const { name: decodedURIWithoutIdPath } =
        splitShowGuidAndNameFromPath(decodedURI);
      const isNeedToReplaceToGalleryPath =
        (replaceToGalleryPath?.indexOf(decodedURIWithoutIdPath.toLowerCase()) ??
          -1) >= 0;
      const isMyCollectionPath = decodedURIWithoutIdPath
        .toLowerCase()
        .startsWith('0x');
      if (isNeedToReplaceToGalleryPath)
        return PAGE_URL.collectors_marketplace.name;
      if (isMyCollectionPath) return PAGE_URL.collectors_my.name;
      return decodedURIWithoutIdPath;
    })
    .filter(
      (v) =>
        v.length > 0 &&
        // remove excluded paths
        !excludePaths.some((excludePath) => excludePath === v.toLowerCase()),
    );
};

interface BreadcrumbProps {
  address: string;
  getTextGenerator?: (param: string, query: ParsedUrlQuery) => null;
}
const BreadcrumbNext: FC<BreadcrumbProps> = ({
  address,
  getTextGenerator = _defaultGetTextGenerator,
}) => {
  const router = useRouter();
  const breadcrumbs = React.useMemo(() => {
    const asPathNestedRoutes = generatePathParts(router.asPath);
    const pathnameNestedRoutes = generatePathParts(router.pathname);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // Pull out and convert "[post_id]" into "post_id"
      const param = pathnameNestedRoutes[idx]
        ?.replace('[', '')
        ?.replace(']', '');

      const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
      return {
        href,
        textGenerator: getTextGenerator(param, router.query),
        title: `${subpath.charAt(0).toUpperCase()}${subpath.slice(1)}`,
      };
    });

    return crumblist;
  }, [router.asPath]);

  const getCrumbComponents = () => {
    const len = breadcrumbs?.length ?? 0;
    const isExist = len && len > 0;
    if (!isExist) return null;
    return breadcrumbs.map((crumb, index) => {
      const isLast = index === len - 1;
      return (
        <Crumb
          key={index}
          {...crumb}
          isLast={isLast}
          router={router}
          address={address}
        />
      );
    });
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb?.title ?? '',
      // link 需過濾，確保產出來的是可連結的 URL
      // https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa
      item: getFrontendMindtrixWebDomain() + (crumb?.href ?? ''),
    })),
  };
  return (
    <>
      <Script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <S.OL aria-label='breadcrumb'>{getCrumbComponents()}</S.OL>
    </>
  );
};

export default BreadcrumbNext;
