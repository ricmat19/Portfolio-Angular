import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../apis/indexAPI';
import HeaderC from './header';
import FooterC from './footer';

function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => { 
        images[index.replace('./', '')] = projects(index); 
    });
    return images
}
const projectThumbnail = importAll(require.context('../images/projects'));

const PortfolioC = () => {

    const [projects, setProjects] = useState([]);
    const [technology, setTechnology] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                //Get all skills from DB
                const projects = await IndexAPI.get(`/projects`);
                const projectThumbnailArray = [];
                for(let i = 0; i < projects.data.results[0].length; i++){
                    projects.data.results[0][i].thumbnail = projectThumbnail[projects.data.results[0][i].thumbnail]
                    projectThumbnailArray.push(projects.data.results[0][i])
                }
                setProjects(projectThumbnailArray);

                //Array of projects in project_tech
                const projectsArray = [];

                //Adds all the projects in the projectsArray
                for(let i = 0; i < projects.data.results[1].length; i++){
                    if(projectsArray.indexOf(projects.data.results[1][i].project) === -1){
                        projectsArray.push(projects.data.results[1][i].project);
                    }
                }

                const projectTechArray = [];
                //Loops through the projectArray
                for(let i = 0; i < projectsArray.length; i++){
                    const tempArray = [];
                    //Loops through all data provided from project_tech
                    for(let j = 0; j < projects.data.results[1].length; j++){
                        //Checks if the current item in project_tech pertains to the current project
                        if(projects.data.results[1][j].project === projectsArray[i]){
                            tempArray.push(projects.data.results[1][j].technology)
                        }
                    }
                    const key = projectsArray[i];
                    const tempObject = {};
                    tempObject[key] = [tempArray];
                    projectTechArray.push(tempObject)
                }

                setTechnology(projectTechArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const filterProjects = async (tech) => {
        try{
                //Get all skills from DB
                const projects = await IndexAPI.get(`/projects`);

                const techProjects = []
                //Get projects that have the specified project_tech
                for(let i = 0; i < projects.data.results[1].length; i++){
                    if(projects.data.results[1][i].technology === tech){
                        techProjects.push(projects.data.results[1][i].project)
                    }
                }

                const projectThumbnailArray = [];
                for(let i = 0; i < projects.data.results[0].length; i++){
                    if(techProjects.includes(projects.data.results[0][i].project)){
                        projects.data.results[0][i].thumbnail = projectThumbnail[projects.data.results[0][i].thumbnail]
                        projectThumbnailArray.push(projects.data.results[0][i])
                    }
                    // console.log(projects.data.results[0][i].project)
                }
                setProjects(projectThumbnailArray);

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
                    <div className="portfolio-thumbnail-div" >
                        {projects.map((project, index) => {
                            return(
                                <div className="portfolio-item-div" key={index}>
                                    <div className="portfolio-project">
                                        <img className="project-thumbnail" src={project.thumbnail.default}/>
                                        <div className="thumbnail-overlay thumbnail-overlay--blur">
                                            <div className="grid buttons-div">
                                                <div className="tech-used">
                                                    {technology.map((tech, index) => {
                                                        if(tech[project.project] !== undefined){
                                                            return(
                                                                <div className="grid project-tech" key={index}>
                                                                    {tech[project.project][0].map((t, index) => {
                                                                        return(
                                                                            <button key={index} onClick={() => filterProjects(t)}>
                                                                                {t}
                                                                            </button>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default PortfolioC;