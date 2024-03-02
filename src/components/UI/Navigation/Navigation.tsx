import { Navbar } from 'flowbite-react';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from '../../../utils/MobileDetect';
import { NavbarTheme } from '../../../Themes/NavbarTheme';

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
    <Navbar rounded className="mx-auto px-5 border-b" theme={NavbarTheme}>
      <Navbar.Brand as={Link} href="https://katzkycode.com">
        <h1 className="text-2xl font-bold my-2">Daily Planner</h1>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={'div'} active={pathname === '/' ? true : false}>
          <Link to="/" onClick={handleLinkClick}>
            Intro
          </Link>
        </Navbar.Link>

        <Navbar.Link as={'div'} active={pathname === '/daily' ? true : false}>
          <Link to="/daily" onClick={handleLinkClick}>
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
            Credentials
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
