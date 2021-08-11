import React from 'react';

const HeaderC = () => {

    return(
        <div className="container">
            <nav className="navbar">
                <a className="nav-link" href="/"><p>home</p></a>
                <a className="nav-link" href="/portfolio"><p>portfolio</p></a>
                <a className="nav-link" href="/skills"><p>skills</p></a>
                <a className="nav-link" href="/contact"><p>contact</p></a>
            </nav>
        </div>
    )
}

export default HeaderC;