import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Headers = () => {
  const { carts } = useSelector((state) => state.allCart);

  return (
    <Menu fixed='top' style={{padding:"10px"}}>
    <Link to="/home">  <Menu.Item header>Ecommerce</Menu.Item></Link>
      <Menu.Menu position='right'>
        <Menu.Item>
        <Link to="/cart">  <Icon name='cart' size='large' /></Link>
          <span style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', borderRadius: '50%', padding: '3px 6px', fontSize: '12px' }}>{carts.length}</span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Headers;
