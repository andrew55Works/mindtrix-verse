import React, { useEffect, useRef, useState } from 'react';
import BreadcrumbNext from '../../../components/common/breadcrumb/breadcrumb-next.component';
import { useSelector } from 'react-redux';
import { selectBreadcrumbSliceWithPositionArray } from '../../../redux/breadcrumb/breadcrumb.selector';

export const useBreadcrumb = (address: string) => {
  const [breadcrumbEle, setBreadcrumbEle] = useState<JSX.Element | null>(null);
  const breadcrumb = useSelector(selectBreadcrumbSliceWithPositionArray);
  const isRenderOnceRef = useRef(false);
  useEffect(() => {
    if (!breadcrumb || isRenderOnceRef.current) return;
    setBreadcrumbEle(<BreadcrumbNext address={address} />);
    isRenderOnceRef.current = true;
  }, [breadcrumb]);

  return {
    breadcrumbEle,
    jsonLd: breadcrumb,
  };
};
