import { Color } from '../../types/Colors.d';

export const taskHoursVariations = {
  0.5: 'h-5',
  1: 'h-[10rem]',
  2: 'h-[20rem]',
  3: 'h-[30rem]',
  4: 'h-[40rem]',
  5: 'h-[50rem]',
  6: 'h-[60rem]',
  7: 'h-[70rem]',
  8: 'h-[80rem]',
};

export const colorVariants: Record<Color, string> = {
  blue: 'bg-blue-600 hover:bg-blue-500 border-blue-600',
  red: 'bg-red-600 hover:bg-red-500 border-red-600',
  orange: 'bg-orange-600 hover:bg-orange-500 border-orange-600',
  yellow: 'bg-yellow-600 hover:bg-yellow-500 border-yellow-600',
  green: 'bg-green-600 hover:bg-green-500 border-green-600',
  gray: 'bg-gray-600 hover:bg-gray-500 border-gray-600',
  purple: 'bg-purple-600 hover:bg-purple-500 border-purple-600',
};

export const isDoneVariations: Record<string, string> = {
  true: 'h-10',
  false: 'h-full',
};
