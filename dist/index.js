import React, { useState } from 'react';
import './Menubar.css';
import { SubMenu } from './SubMenu';
const Menubar = ({ items }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return (React.createElement("ul", { className: "mbr--menubar" }, items.map((n, i) => SubMenu({ name: n.name, index: i }))));
};
export default Menubar;
