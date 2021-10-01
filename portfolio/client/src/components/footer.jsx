import React from 'react';

const FooterC = () => {

    return(
        <div className="grid footer">
            <div>
                Ricardo Del Cueto
            </div>
            <div className="grid footer-nav">
                <a className="nav-link" href="/"><p>home</p></a>
                <a className="nav-link" href="/about"><p>about</p></a>
                <a className="nav-link" href="/portfolio"><p>portfolio</p></a>
                <a className="nav-link" href="/skills"><p>skills</p></a>
                <a className="nav-link" href="/contact"><p>contact</p></a>
            </div>
        </div>
    )
}

export default FooterC; 