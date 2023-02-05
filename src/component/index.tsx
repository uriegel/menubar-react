import React, { PropsWithChildren } from 'react'

type Props = {
    children: JSX.Element[]
}


const Menubar = ({ children }: Props ) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Menubar