import Category from './category';
import React, { FC } from 'react';
import { Show } from '../../../redux/show/show.interface';

interface ShowCategoriesProps {
  show: Show;
}
const ShowCategories: FC<ShowCategoriesProps> = ({ show }) => {
  // TODO: should return an array
  const categoryName = show?.category ?? '';
  if (!categoryName) return null;
  return <Category text={categoryName} />;
};

export default ShowCategories;
