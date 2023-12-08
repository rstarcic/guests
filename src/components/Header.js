import React from 'react';
import logo from '../mVisitor-logo.png'
function Header() {
    return (
        <header className="header" style={{ top: '0px' }}>
            <div>
                <a href="https://www.mvisitor.hr/">
                    <img src={logo} alt="logo" className="logo" />
                </a>
            </div>
        </header>
    );
}

export default Header;