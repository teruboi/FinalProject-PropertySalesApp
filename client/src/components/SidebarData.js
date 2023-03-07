import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Catalog',
    path: '/catalog/:userId',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile/:userId',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    path: '/notifications/:userId',
    icon: <AiIcons.AiOutlineBell />,
    cName: 'nav-text'
  },
  {
    title: 'Contacts',
    path: '/contacts/:userId',
    icon: <AiIcons.AiFillPhone />,
    cName: 'nav-text'
  }
];