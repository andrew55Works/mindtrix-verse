import { isIOS } from './common.utils';

export const copyContent = async (text: string) => {
  try {
    const input = document.getElementById(
      'short-link-input',
    ) as HTMLInputElement;
    if (isIOS()) {
      const range = document.createRange();
      const selection = window.getSelection();
      if (input && selection) {
        range.selectNodeContents(input);
        selection.removeAllRanges();
        selection.addRange(range);
        input.setSelectionRange(0, 999999);
        document.execCommand('copy');
        input.blur();
      } else {
        await navigator.clipboard.writeText(text);
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
