import React from 'react';
import HeaderC from './header';
import FooterC from './footer';


const AboutC = () => {

    return(
        <div className="main">
            <HeaderC/>
            <div className="container">
                <div className="title-div">
                    <p className="title">about</p>
                </div>
                <div className="about-content-div">
                    <div className="profile-div">
                        <img/>
                        <div className="info-div">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas doloribus saepe, incidunt unde atque adipisci sint dignissimos dolorum quod provident eligendi! Labore, commodi sit! Quasi consequatur mollitia ad odit excepturi!</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas doloribus saepe, incidunt unde atque adipisci sint dignissimos dolorum quod provident eligendi! Labore, commodi sit! Quasi consequatur mollitia ad odit excepturi!</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas doloribus saepe, incidunt unde atque adipisci sint dignissimos dolorum quod provident eligendi! Labore, commodi sit! Quasi consequatur mollitia ad odit excepturi!</p>
                        </div>
                    </div>
                    <div>
                        <div className="skill-category-div">
                            <div className="sub-title">HTML</div>
                            <div className="skill-div">
                                <div>
                                    <img src="../images/html5-brands.svg"/>
                                    <div className="icon-label">HTML</div>
                                </div>
                                <div>
                                    <img src="../images/react-brands.svg"/>
                                    <div className="icon-label">JSX</div>
                                </div>
                            </div>
                        </div>
                        <div className="skill-category-div">
                            <div className="sub-title">CSS</div>
                            <div className="skill-div">
                                <div>
                                    <img src="../images/css3-alt-brands.svg"/>
                                    <div className="icon-label">CSS</div>
                                </div>
                                <div>
                                    <img src="../images/sass-brands.svg"/>
                                    <div className="icon-label">SASS</div>
                                </div>
                                <div>
                                    <img src="../images/bootstrap-brands.svg"/>
                                    <div className="icon-label">BOOTSTRAP</div>
                                </div>
                            </div>
                        </div>
                        <div className="skill-category-div">
                            <div className="sub-title">JAVASCRIPT</div>
                            <div className="skill-div">
                                <div>
                                    <img src="../images/js-brands.svg"/>
                                    <div className="icon-label">JAVASCRIPT</div>
                                </div>
                                <div>
                                    <img src="../images/react-brands.svg"/>
                                    <div className="icon-label">REACT</div>
                                </div>
                                <div>
                                    <img src="../images/node-js-brands.svg"/>
                                    <div className="icon-label">NODEJS</div>
                                </div>
                            </div>
                        </div>
                        <div className="skill-category-div">
                            <div className="sub-title">DATABASE</div>
                            <div className="skill-div">
                                <div>
                                    <img/>
                                    <div className="icon-label">MYSQL</div>
                                </div>
                                <div>
                                    <img/>
                                    <div className="icon-label">POSTRESSQL</div>
                                </div>
                                <div>
                                    <img/>
                                    <div className="icon-label">MONGODB</div>
                                </div>
                            </div>
                        </div>
                        <div className="skill-category-div">
                            <div className="sub-title">OTHER</div>
                            <div className="skill-div">
                                <div>
                                    <img src="../images/github-brands.svg"/>
                                    <div className="icon-label">GITHUB</div>
                                </div>
                                <div>
                                    <img/>
                                    <div className="icon-label">KRITA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default AboutC;