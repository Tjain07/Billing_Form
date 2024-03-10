import React, { useState } from "react";
import { Menu, Dropdown, Modal } from 'antd';
import avatar from './avatar.png'
import { UserOutlined, SettingFilled, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { AiFillEdit } from "react-icons/ai";

import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Handle logout logic here
    } else if (e.key === 'settings') {
      showSettingsModal();
    } else if (e.key === 'edit') {
      toggleEditMode();
    }
    setMenuOpen(false);
  };

  const toggleEditMode = () => {
    setIsEditClicked((prevEditClicked) => !prevEditClicked);
    // onEditButtonClick(!isEditClicked); // Send the toggled value to the parent component
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingFilled />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <button >Logout</button>
      </Menu.Item>
      <Menu.Item key="edit" icon={<AiFillEdit />}>
        <button onClick={toggleEditMode}>
          {isEditClicked ? 'Done Editing' : 'Edit'}
        </button>
      </Menu.Item>
    </Menu>
  );

  const showSettingsModal = () => {
    setSettingsModalVisible(true);
  };

  const handleSettingsModalCancel = () => {
    setSettingsModalVisible(false);
  };

  return (
    <header className="header">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <MenuOutlined />
      </div>
      <div className="header-left">
        Hello Raghav!
      </div>
      <div className="header-right">
        <Dropdown overlay={userMenu} trigger={['click']} open={menuOpen} onOpenChange={(open) => setMenuOpen(open)}>
          <div className="user-dropdown">
            <img
              src={avatar}
              className="h-12 w-12 rounded-full"
              alt="avatar"
            />
          </div>
        </Dropdown>
      </div>
      {/* User Settings Modal */}
      <Modal
        title="User Settings"
        open={isSettingsModalVisible}
        onCancel={handleSettingsModalCancel}
        footer={null}
      >
        {/* Add your settings form or content here */}
        <p>Settings content goes here.</p>
      </Modal>
    </header>
  );
}

export default Header;
