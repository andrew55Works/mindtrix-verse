// Formats string representations of UFix64 numbers. The maximum `UFix64` value is 184467440737.09551615
export const formattedCurrency = (amount: string | undefined | null = '0') => {
  if (typeof amount !== 'string' && typeof amount !== 'undefined')
    throw new Error('expected string amount, got');
  if (amount.length === 0) return '0';
  const [integer, decimal] = amount.split('.');
  // Format the integer separately to avoid rounding
  const formattedInteger = parseFloat(integer).toLocaleString('en-US');
  return [formattedInteger, decimal?.replace(/0+$/, '')]
    .filter(Boolean)
    .join('.');
};

// Formats a string representation of a UFix64 number
export const uFix64String = (numStr: string) => {
  if (typeof numStr !== 'string')
    throw new Error('uFix64String expected a string');
  if (!numStr.includes('.')) return `${numStr}.0`; // Add decimal if missing
  return numStr;
};

export const floatNumToThousandsSeparatorStr = (num: number) => {
  try {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  } catch (e) {
    console.error('floatNumToThousandsSeparatorStr error:', e);
    return '0';
  }
};

export const thousandsSeparatorStrToNum = (
  thousandsSeparatorStr: string,
  fractionDecimalNumber = 0,
): number => {
  try {
    const s = thousandsSeparatorStr ? thousandsSeparatorStr : '0';
    const numberFixedStr = Number(s.replace(/,/g, '')).toFixed(
      fractionDecimalNumber,
    );
    return Number(numberFixedStr);
  } catch (e) {
    console.error('thousandsSeparatorStrToNum error:' + e);
    return 0;
  }
};
