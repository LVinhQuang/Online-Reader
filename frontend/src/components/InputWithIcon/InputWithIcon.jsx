import React from 'react'

export const InputLogo = ({icon, type, placeholder}) => {
    return (
        <div className="input">
            <img src={icon} />
            <input type={type} placeholder={placeholder} />
        </div>
    )
}
