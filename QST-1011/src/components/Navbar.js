import hamburger from '../assets/menu-line.svg';
import logo from '../assets/logo-color.svg';
import mappin from '../assets/map-pin-line.svg';
import user from '../assets/user-3-line.svg';
import shoppingbag from '../assets/shopping-bag-line.svg';
import NavItems from './NavItems';

export default function Navbar({toggleFunction}) {
    return (
      <>
        
        <div className='navbar'>
          <ul>
            <li className="menu-toggle"> <img src={hamburger} id="hamburger-menu" onClick={toggleFunction} /> </li>
            <li className="header-logo"> <img src={logo} id="logo"/> </li>
            <div className="left-navbar">
              <NavItems classname='left-navbar-items'/>
            </div>
            <li className="navbar-space"></li>
            <div className="right-navbar">
            <li className="right-navbar-items"><img src={mappin} height="20px"/></li>
            <li className="right-navbar-items"><img src={user} height="20px"/></li>
            <li className="right-navbar-items"><img src={shoppingbag} height="20px"/></li>
            </div>
        
          </ul>
        </div>
      </>
    );
  }