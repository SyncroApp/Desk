import React from 'react';
import logo from '../assets/logo/white-no-bg.png';

const Sidebar = ({ onSelect, setIsSidebarOpen, selectedView }) => {
  const handleMenuClick = (view) => {
    onSelect(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="sidebar">
      <img
        className="w-14 h-auto mb-4"
        src={logo}
        alt="Logo"
        onClick={() => handleMenuClick('editProfile')}
      />
      <button
        className={`py-4 px-4 rounded-full sidebar-menu ${
          selectedView === 'home' ? 'active' : ''
        }`}
        onClick={() => handleMenuClick('home')}
      >
        <span className="material-icons sidebar-icons text-base">home</span>Home
      </button>
      <button
        className={`py-4 px-4 rounded-full sidebar-menu ${
          selectedView === 'createProfile' ? 'active' : ''
        }`}
        onClick={() => handleMenuClick('createProfile')}
      >
        <span className="material-icons sidebar-icons text-base">person</span>Profile
      </button>
      <button
        className={`py-4 px-4 rounded-full sidebar-menu ${
          selectedView === 'project' ? 'active' : ''
        }`}
        onClick={() => handleMenuClick('project')}
      >
        <span className="material-icons sidebar-icons text-base">work</span>Projects
      </button>
      <button
        className={`py-4 px-4 rounded-full sidebar-menu ${
          selectedView === 'task' ? 'active' : ''
        }`}
        onClick={() => handleMenuClick('task')}
      >
        <span className="material-icons sidebar-icons text-base">sort</span>Tasks
      </button>
    </div>
  );
};

export default Sidebar;
