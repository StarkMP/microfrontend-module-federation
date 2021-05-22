import React from 'react';

import '@styles/Button.scss';

export default function Button({ children }) {
    return <button className='btn'>{children}</button>;
}