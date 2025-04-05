import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  PlusOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Index from './Routes';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Function to create menu items
  function getItem(label, key, icon, children = null, onClick = null) {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    };
  }

  // Sidebar menu items
  const items = [
    getItem('Dashboard', '1', <HomeOutlined />, null, () => navigate('/dashboard')),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Users', 'sub1', <UsergroupAddOutlined />  
    ),
    getItem('Products', 'sub2', <AppstoreAddOutlined />, [
      getItem('Add Products', '6', <PlusOutlined />, null, () => navigate('/dashboard/add-product')),
      getItem('Show All Products', '8', <AppstoreOutlined />, null, () => navigate('/dashboard/show-products')),
      getItem('Sells Products', '9', <AppstoreOutlined />, null, null),
    ]),
    getItem('Files', '10', <FileOutlined />, null, () => navigate('/files')),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Keeps Logout at the bottom
        }}
      >
        {/* Main Menu */}
        <div>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            style={{ height: '84vh', paddingTop: '10px' }}
            onClick={({ key }) => {
              // Handling click navigation
              const selectedItem = items.find(item => item.key === key);
              if (selectedItem?.onClick) {
                selectedItem.onClick();
              }
            }}
          />
        </div>

        {/* Logout Button at the Bottom */}
        <Menu
          theme="light"
          mode="inline"
          items={[
            getItem('Logout', 'logout', <LogoutOutlined />, null, () => {
              console.log('User Logged Out');
              navigate('/login'); // Redirect to login page on logout
            }),
          ]}
          onClick={({ key }) => {
            if (key === 'logout') {
              console.log('Logging out...');
              navigate('/login');
            }
          }}
        />
      </Sider>

      {/* Main Content */}
      <Layout style={{ background: '#ffffff' }}>
        <Index />
      </Layout>
    </Layout>
  );
};

export default App;
