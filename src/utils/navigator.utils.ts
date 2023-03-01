export const shareLinkToNativeApp = (
  url: string,
  shareLinkToDesktop: () => void,
) => {
  if (!url) throw new Error('Cannot share empty link!');
  if (navigator.share) {
    navigator
      .share({
        url,
      })
      .then(() => {})
      .catch((e) => {
        console.error('shareLinkToNativeApp error:', e);
      });
  } else {
    shareLinkToDesktop && shareLinkToDesktop();
  }
};
