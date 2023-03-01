import { _get } from '../../utils/lodash.utils';
import {
  ILandmark,
  ILandmarkModal,
  IPack,
  ViennaWorldFiles,
} from '../../types/vienna-world.types';

export const getLandmarkInfoByName = (landmarkName: string): ILandmark => {
  return _get(ViennaWorldFiles, ['landmarks', landmarkName], {}) as ILandmark;
};

export const getPackInfoByName = (landmarkName: string): IPack => {
  return _get(ViennaWorldFiles, ['packs', landmarkName], {}) as IPack;
};

export const useLandmarkModalInfo = (landmarkName: string): ILandmarkModal => {
  const landmark = getLandmarkInfoByName(landmarkName);
  const pack = getPackInfoByName(landmarkName);

  return {
    landmark,
    pack,
  };
};

export const updateLandmarkModalInfoI18nText = (
  textI18n: any,
  landmarkModal: ILandmarkModal,
) => {
  const landmarkId = landmarkModal.landmark?.id ?? '';
  landmarkModal.landmark.name = _get(
    textI18n,
    [landmarkId, 'title_landmark'],
    '',
  );
  landmarkModal.landmark.description = _get(
    textI18n,
    [landmarkId, 'label_landmark_introduction'],
    '',
  );
  landmarkModal.pack.name = _get(textI18n, [landmarkId, 'card_pack_name'], '');
  return landmarkModal;
};
