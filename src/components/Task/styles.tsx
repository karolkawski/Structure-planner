import { Color } from '../../types/Colors.d';

export const colorVariants: Record<Color, string> = {
  blue: 'bg-blue-600 hover:bg-blue-500 border-blue-600',
  red: 'bg-red-600 hover:bg-red-500 border-red-600',
  orange: 'bg-orange-600 hover:bg-orange-500 border-orange-600',
  yellow: 'bg-yellow-600 hover:bg-yellow-500 border-yellow-600',
  green: 'bg-green-600 hover:bg-green-500 border-green-600',
  gray: 'bg-gray-600 hover:bg-gray-500 border-gray-600',
  purple: 'bg-purple-600 hover:bg-purple-500 border-purple-600',
};

export const checkBoxVariants: Record<Color, string> = {
  blue: 'text-blue-600 bg-blue-100 border-blue-300 focus:ring-blue-500 dark:focus:ring-blue-600',
  red: 'text-red-600 bg-red-100 border-red-300 focus:ring-red-500 dark:focus:ring-red-600',
  orange:
    'text-orange-600 bg-orange-100 border-orange-300 focus:ring-orange-500 dark:focus:ring-orange-600',
  yellow:
    'text-yellow-600 bg-yellow-100 border-yellow-300 focus:ring-yellow-500 dark:focus:ring-yellow-600',
  green:
    'text-green-600 bg-green-100 border-green-300 focus:ring-green-500 dark:focus:ring-green-600',
  gray: 'text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600',
  purple:
    'text-purple-600 bg-purple-100 border-purple-300 focus:ring-purple-500 dark:focus:ring-purple-600',
};
