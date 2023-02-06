import React from 'react'
import "./Menubar.css"

type Props = {
    children: JSX.Element[]
}

const Menubar = ({ children }: Props ) => {
    return (
        <ul className="mbr--menubar">
            {children}
        </ul>
    )
}

export default Menubar