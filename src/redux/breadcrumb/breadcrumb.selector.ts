import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';
import {
  BreadcrumbJsonLd,
  breadcrumbJsonLdStateDefault,
} from './breadcrumb.interface';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.breadcrumbSlice;

export const selectBreadcrumbSliceWithPositionObj = createSelector(
  [selectedState],
  (breadcrumbSlice) => {
    return breadcrumbSlice?.breadcrumbJsonLd ?? breadcrumbJsonLdStateDefault();
  },
);

export const selectBreadcrumbSliceWithPositionArray = createSelector(
  [selectedState],
  (breadcrumbSlice) => {
    const breadWithPositionObject =
      breadcrumbSlice?.breadcrumbJsonLd ?? breadcrumbJsonLdStateDefault();

    const breadWithPositionArray: BreadcrumbJsonLd = {
      '@context': breadWithPositionObject['@context'],
      '@type': breadWithPositionObject['@type'],
      itemListElement: Object.keys(breadWithPositionObject.positionObj).map(
        (position) => breadWithPositionObject.positionObj[position],
      ),
    };
    return breadWithPositionArray;
  },
);
