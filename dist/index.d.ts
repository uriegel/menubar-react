/// <reference types="react" />
import './Menubar.css';
interface SubMenuProps {
    name: string;
}
interface MenubarProps {
    items: SubMenuProps[];
}
declare const Menubar: ({ items }: MenubarProps) => JSX.Element;
export default Menubar;
