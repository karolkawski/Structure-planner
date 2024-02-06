import {
  FaBook,
  FaComputerMouse,
  FaPaperPlane,
  FaDumbbell,
  FaAppleWhole,
  FaCouch,
} from 'react-icons/fa6';
import { Icons } from '../../../types/Icons.d';
import { ReactElement } from 'react';

const iconVariations: Record<Icons, ReactElement> = {
  study: <FaBook />,
  work: <FaComputerMouse />,
  email: <FaPaperPlane />,
  gym: <FaDumbbell />,
  food: <FaAppleWhole />,
  rest: <FaCouch />,
};

const collorVariations: Record<'white' | 'black', string> = {
  white: 'text-white',
  black: 'text-black',
};

const Icon = ({
  icon,
  color,
  className,
}: {
  icon: Icons;
  color: 'white' | 'black';
  className?: string;
}) => {
  return (
    <div className={`${className} ${collorVariations[color]}`}>
      {iconVariations[icon]}
    </div>
  );
};

export default Icon;
