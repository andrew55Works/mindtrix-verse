import { Text } from '../../../styles/styled-system/text.theme';
import React, { FC, useState } from 'react';
import { CommonSwitch, SwitchEnum } from '../../common/input/common-switch';
import { useChangeLocale } from '../../../hooks/i18n/i18n.hooks';
import { useRouter } from 'next/router';

const Option = {
  lang: {
    Left: <Text.h5 status={'basic'} children={'EN'} color={'inherit'} />,
    Right: <Text.h5 status={'basic'} children={'中文'} color={'inherit'} />,
  },
};

interface Props {
  isHide: boolean;
}
export const LanguageSwitcher: FC<Props> = ({ isHide }) => {
  const router = useRouter();
  const currentLocale = router?.locale ?? 'en';
  const [targetedLang, setTargetedLang] = useState('');

  useChangeLocale(router, targetedLang);
  const defaultIsCheck = !(currentLocale === 'en');

  const onSwitch = (
    e: React.ChangeEvent<HTMLInputElement>,
    switchEnum: SwitchEnum,
  ) => {
    const newLang = switchEnum === SwitchEnum.PRIMARY_LEFT ? 'en' : 'zh';
    setTargetedLang(newLang);
  };
  if (isHide) return null;
  return (
    <CommonSwitch
      OptionLeft={Option.lang.Left}
      OptionRight={Option.lang.Right}
      defaultIsCheck={defaultIsCheck}
      addressFromQuery={''}
      width={'120px'}
      height={'44px'}
      onClick={onSwitch}
      marginRight={'10px'}
      isShowFilter={true}
      isSvg={false}
    />
  );
};
