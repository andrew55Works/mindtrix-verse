import { Dot, DotContainer } from './pager.styles';
import React, { useContext } from 'react';
import { PagerContext } from './pager-with-dot.component';

export const Dots = () => {
  const { currentPageIndex, pagers, setPageIndex } = useContext(PagerContext);
  if (!setPageIndex) return null;
  return (
    <DotContainer height={['60px', '100px']}>
      {pagers.map((page) => {
        const dotIndex = page?.index ?? 0;
        return (
          <Dot
            key={dotIndex}
            isSelected={currentPageIndex === dotIndex}
            onClick={() => setPageIndex(page?.index ?? 0)}
          />
        );
      })}
    </DotContainer>
  );
};
