import { Navbar } from 'flowbite-react';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from '../../../utils/MobileDetect';

const Navigation: FC = () => {
  const [MobileDevice] = useState(isMobile());
  const pathname = useLocation().pathname;

  const handleLinkClick = () => {
    const collapse = document.querySelector(
      '[data-testid="flowbite-navbar-collapse"]'
    );
    MobileDevice && collapse?.classList.add('hidden');
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://katzkycode.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-2">
          Daily Planner
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={'div'} active={pathname === '/' ? true : false}>
          <Link to="/" onClick={handleLinkClick}>
            Structure Daily
          </Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={pathname === '/tasks' ? true : false}>
          <Link to="/tasks" onClick={handleLinkClick}>
            Tasks
          </Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={pathname === '/about' ? true : false}>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
