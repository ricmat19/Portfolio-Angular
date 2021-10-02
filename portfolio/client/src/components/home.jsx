import React from 'react';
import HeaderC from './header';
import FooterC from './footer';


const HomeC = () => {

    return(
        <div className="main">
            <HeaderC/>
            <div>
                <div className="title-div">
                    <p className="title">home</p>
                </div>
                <div className="form-div">
                    
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default HomeC;