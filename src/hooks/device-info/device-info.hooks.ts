import React from 'react';
import DeviceInfo from 'react-native-device-info';

export class DeviceInfoModel {
  public uniqueId = '';
  public manufacturer = '';
  public firstInstallTime = 0;
  public systemVersion = '';
  public brand = '';
  public androidId = '';
  public apiLevel = 0;
  public device = '';
  public usedMemory = 0;
}
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = React.useState(new DeviceInfoModel());
  React.useEffect(() => {
    const getDeviceInfo = async () => {
      const uniqueId = await DeviceInfo.getUniqueId();
      const manufacturer = await DeviceInfo.getManufacturer();
      const firstInstallTime = await DeviceInfo.getFirstInstallTime();
      const systemVersion = await DeviceInfo.getSystemVersion();
      const brand = await DeviceInfo.getBrand();
      const androidId = await DeviceInfo.getAndroidId();
      const apiLevel = await DeviceInfo.getApiLevel();
      const device = await DeviceInfo.getDevice();
      const usedMemory = await DeviceInfo.getUsedMemory();
      const deviceInfoRes = {
        uniqueId,
        manufacturer,
        firstInstallTime,
        systemVersion,
        brand,
        androidId,
        apiLevel,
        device,
        usedMemory,
      };
      setDeviceInfo(deviceInfoRes);
    };
    getDeviceInfo();
  }, []);
  return { deviceInfo };
};

export const useUpdateDeviceInfo = (deviceInfo: DeviceInfoModel) => {
  React.useEffect(() => {}, [deviceInfo]);
};
