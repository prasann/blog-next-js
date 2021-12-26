import React from "react";

type Props = {
    children: React.ReactNode
    text: string
}

const IconWithText = ({children, text}: Props) => {
    return <div className="flex align-middle">
        {children}
        <span>{text}</span>
    </div>
}

export default IconWithText;
