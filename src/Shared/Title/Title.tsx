import React from 'react'
import { lora } from '../font/Rubik';

const Title = ({ title, className }: { title: string, className?: string }) => {
    return (
        <h2 className={`global-h2 capitalize font-normal! ${lora.className} ${className} title`}>{title}</h2>
    )
}

export default Title;