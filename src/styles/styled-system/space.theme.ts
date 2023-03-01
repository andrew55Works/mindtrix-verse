export type SpaceType = {
  p10: string;
} & Array<string>;

const space = [
  '0',
  '4px',
  '8px',
  '12px',
  '16px',
  '20px',
  '24px',
  '32px',
  '40px',
  '48px',
  '64px',
  '80px',
  '96px',
  '112px',
  '128px',
] as SpaceType;

space.p10 = '10px';

export default space as SpaceType;
