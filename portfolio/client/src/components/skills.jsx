import React from 'react';
import HeaderC from './header';
import FooterC from './footer';

const SkillsC = () => {

    return(
        <div className="">
            <HeaderC/>
            <div className="container">
                <div className="title-div">
                    <p className="title">skills</p>
                </div>
                <div className="main-content">
                    <div className="about-div">

                    </div>
                    <div className="skill-set-div">
                        <div className="skill-div">
                            <label className="skill-label">HTML</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">CSS</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">SCSS</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">BOOTSTRAP</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">JAVASCRIPT</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">REACT</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">NODE.js</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">GITHUB</label>
                            <div className="skill-bar"></div>
                        </div>
                        <div className="skill-div">
                            <label className="skill-label">POSTGRESSQL</label>
                            <div className="skill-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default SkillsC;