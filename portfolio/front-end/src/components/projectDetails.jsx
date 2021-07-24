import React, { useState } from 'react';
import HeaderC from './header';
import FooterC from './footer';


const ProjectDetailsC = () => {

    const [project, setProject] = useState("");

    return(
        <div className="">
            <HeaderC/>
            <div className="container">
                <div className="title-div">
                    <p className="title">{project}</p>
                </div>
                <div className="form-div">
                    
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default ProjectDetailsC;