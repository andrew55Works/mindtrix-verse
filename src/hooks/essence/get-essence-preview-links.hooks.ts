import { useEffect, useState } from 'react';

export const useEssencePreviewLinks = (
  showName: string,
  episodeGuid: string,
) => {
  const [previews, setPreviews] = useState({
    imageEssencePreviewImage: '',
    audioEssencePreviewImage: '',
    audioEssencePreviewVideo: '',
  });
  useEffect(() => {
    if (!!showName && !!episodeGuid) {
      const previewsTmp = {
        imageEssencePreviewImage:
          showName === 'fantasy'
            ? 'https://app.mindtrix.xyz/img/previews/previews_cl6tatqu0058n01z6dr7zcz6y_image.png'
            : `https://app.mindtrix.xyz/img/previews/previews_${episodeGuid}_image.jpg`,
        audioEssencePreviewImage: `https://app.mindtrix.xyz/img/previews/previews_audio_essence_${showName}.jpg`,
        audioEssencePreviewVideo: `https://app.mindtrix.xyz/video/previews/previews_audio_essence_${showName}.mp4`,
      };
      setPreviews(previewsTmp);
    }
  }, [showName, episodeGuid]);

  return { ...previews };
};
