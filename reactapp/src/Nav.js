import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom';

function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Icon type="home" />
            <Link to="/screen_source" >Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Icon type="read" />
            <Link to="/screen_my_articles" >My Articles</Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Icon type="logout" />
          Logout
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
