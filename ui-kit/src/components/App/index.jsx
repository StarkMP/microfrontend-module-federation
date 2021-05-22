import React from 'react';

import '@styles/index.scss';
import Button from '@components/Button';

export default function App() {
    const kitComponents = [
        <Button key={0}>Some Button</Button>
    ];

    return (
        <div className='kit'>
            <h1 className='kit__title'>UI-KIT</h1>
            <ul>
                {kitComponents.map((component, index) => <ul key={index}>{component}</ul>)}
            </ul>
        </div>
    );
}