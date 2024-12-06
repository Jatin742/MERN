import React, { Fragment, useState } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../Actions/userAction';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispath = useDispatch();
  const [menu, setMenu] = useState(false);
  const handleMenu = () =>{
    setMenu(!menu);
  }
  const handleLogout = () => {
    dispath(logout());
    setMenu(false);
  }
  return (
    <Fragment>
      <div className="header">
        {menu? 
          <ImCross className='menu-svg'  onClick={handleMenu}/>
          :
          <GiHamburgerMenu className='menu-svg' onClick={handleMenu}/>
        }
        <Link className='logo' to="/" onClick={()=> setMenu(false)}>Logo</Link>

        <div className={`box1  ${menu ? "menu-active" : "menu-close"}`}>
          {isAuthenticated ?
            <>
              <div className='name'>{user.name}</div>
              <Link className='logout' onClick={handleLogout}>Logout</Link>
            </>
            :
            <Link to="/login" onClick={()=> setMenu(false)}>Login</Link>}
        </div>
      </div>
      <div
        className={`overlay ${menu ? "active" : ""}`}
        onClick={handleMenu}
      ></div>
    </Fragment>
  )
}

export default Header