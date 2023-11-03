import NavItems from "./NavItems";
import closeline from '../assets/close-line.svg';


export default function NavbarMenu({isActive, toggleFunction}) {

    return(
      <div className={`navbar-menu ${isActive ? 'active' : ''}`}>
        <ul className="navbar-menu-list">
            <img src={closeline} id="close-navbar" height="20px" onClick={toggleFunction} />
            <NavItems classname=''/>
        </ul>
      </div>
    );
  }