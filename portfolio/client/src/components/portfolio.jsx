import React, { useContext, useState } from 'react';
import HeaderC from './header';
import FooterC from './footer';
import {useHistory} from "react-router-dom";


const PortfolioC = () => {

    const [pageNumber, setPageNumber] = useState(0);

    let history = useHistory();

    const itemsPerPage = 9;
    const pagesVisted = pageNumber * itemsPerPage;

    // const portfolioThumbnails = portfolio.slice(pagesVisted, pagesVisted + itemsPerPage).map((project) => {
    //     return(
    //         <div className="portfolio-item-div" key={project.id} onClick={() => displayProject(project.product, project.id)}>
    //             <div className="portfolio-project">
    //                 <img className="project-thumbnail" src={project.imageBuffer}/>
    //             </div>
    //         </div>
    //     );
    // });

    const displayProject = async (product, id) => {
        try{
            history.push(`/collection/${product}/${id}`)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="main">
            <HeaderC/>
            <div className="container">
                <div className="title-div">
                    <p className="title">portfolio</p>
                </div>
                <div className="portfolio-thumbnail-div">
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/arcade-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <button>HTML</button>
                                    <button>GITHUB</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/ecommerce-store-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <button>HTML</button>
                                    <button>GITHUB</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/planner-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <button>HTML</button>
                                    <button>GITHUB</button>
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

export default PortfolioC;