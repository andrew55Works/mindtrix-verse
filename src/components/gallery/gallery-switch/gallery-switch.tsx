import React, { FC } from 'react';
import {
  CommonSwitch,
  CommonSwitchProps,
} from '../../common/input/common-switch';
import GroupedByCreatorsSVG from '../../../assets/svg/icon_sort_creator.svg';
import GroupedByCreationsSVG from '../../../assets/svg/icon_sort_creation.svg';

export type GallerySwitcherProps = Pick<
  CommonSwitchProps,
  'addressFromQuery' | 'onClick' | 'isShowFilter'
>;
const GallerySwitch: FC<GallerySwitcherProps> = ({
  addressFromQuery,
  onClick,
  isShowFilter,
}) => {
  const Option = {
    displayGrid: {
      Left: (
        <GroupedByCreatorsSVG
          style={{ fill: 'white', width: '24px', height: '24px' }}
        />
      ),
      Right: (
        <GroupedByCreationsSVG
          style={{ fill: 'white', width: '24px', height: '24px' }}
        />
      ),
    },
  };
  return (
    <CommonSwitch
      addressFromQuery={addressFromQuery}
      OptionLeft={Option.displayGrid.Left}
      OptionRight={Option.displayGrid.Right}
      onClick={onClick}
      isSvg={true}
      isShowFilter={isShowFilter}
    />
  );
};

export default GallerySwitch;
