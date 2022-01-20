import React from "react";

type Props = {
    children: React.ReactNode
    text: string
}

const IconWithText = ({children, text}: Props) => {
    return <div className="flex align-middle">
        {children}
        <span className="mx-2 mt-1">{text}</span>
    </div>
}

export default IconWithText;
