import { ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <header className={`w-full`}>
      <h1 className="text-lg font-bold my-2">{title}</h1>
      {children ? children : ''}
    </header>
  );
};

export default Header;
