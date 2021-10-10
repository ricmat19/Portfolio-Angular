import React, { useEffect, useRef, useState } from 'react';
import {useHistory, useParams} from "react-router-dom";
import IndexAPI from '../../apis/indexAPI';
import HeaderC from '../header';
import FooterC from '../footer';

function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => { 
        images[index.replace('./', '')] = projects(index); 
    });
    return images
}
const projectThumbnail = importAll(require.context('../../images/projects'));

const ProjectDetailsC = () => {

    let history = useHistory();
    let parameters = useParams();

    const [title, setTitle] = useState("");
    const [project, setProject] = useState("");

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setTitle(parameters.project.toLowerCase())

                //Get project from DB
                const project = await IndexAPI.get(`/project`);
                console.log(project)
                const projectThumbnailArray = [];
                for(let i = 0; i < project.data.results[0].length; i++){
                    project.data.results[0][i].thumbnail = projectThumbnail[project.data.results[0][i].thumbnail]
                    projectThumbnailArray.push(project.data.results[0][i])
                }
                setProject(projectThumbnailArray);

                //Get Project skills from DB

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main">
            <HeaderC/>

            <div className="container">
                <div className="title-div">
                    <p className="title">{title}</p>
                </div>
                <div className="project-slide-div">

                </div>
            </div>

            <FooterC/>
        </div>
    )
}

export default ProjectDetailsC;