import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Index from './Routes';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '1', <HomeOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Items upar aur logout neeche
        }}
      >
        <div>
          <div className="demo-logo-vertical "  />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} style={{height:"84vh",paddingTop:"10px"}}/>
        </div>

        {/* Logout Button at the Bottom */}
        
        <Menu
          theme="light"
          mode="inline"
                   items={[
            getItem('Logout', 'logout', <LogoutOutlined />),
          ]}
        />
      </Sider>

      <Layout style={{  background: '#ffffff' }}>
        <Index />
      </Layout>
    </Layout>
  );
};

export default App;
