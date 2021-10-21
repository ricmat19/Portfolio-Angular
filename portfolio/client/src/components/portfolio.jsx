import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import IndexAPI from "../apis/indexAPI";
import HeaderC from "./header";
import FooterC from "./footer";
function importAll(projects) {
  let images = {};
  projects.keys().forEach((index) => {
    images[index.replace("./", "")] = projects(index);
  });
  return images;
}
const projectThumbnails = importAll(require.context("../images/projects"));

const PortfolioC = () => {
  let history = useHistory();

  const currentProjectThumbnailArray = [];

  const [createModal, setCreateModal] = useState("modal");
  const [updateModal, setUpdateModal] = useState("modal");
  const [deleteModal, setDeleteModal] = useState("modal");
  const [createdProject, setCreatedProject] = useState("");
  const [updatedProject, setUpdatedProject] = useState("");
  const [deletedProject, setDeletedProject] = useState("");

  const [projects, setProjects] = useState();

  const [titles, setTitles] = useState([]);
  const [allThumbnails, setAllThumbnails] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [skills, setSkills] = useState([]);

  const [filterButtons, setFilterButtons] = useState("skill-buttons");
  const [primaryThumbnails, setPrimaryThumbnails] = useState([]);
  const [filteredThumbnails, setFilteredThumbnails] = useState([]);

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentThumbnails, setCurrentThumbnails] = useState([]);
  const [currentTech, setCurrentTech] = useState([]);

  const displayFilter = async () => {
    try {
      if (filterButtons === "skill-buttons") {
        setFilterButtons("skill-buttons skill-buttons-view");
      } else {
        setFilterButtons("skill-buttons");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const skills = await IndexAPI.get(`/skills`);
        const skillsList = [];
        for (let i = 0; i < skills.data.data.skills.length; i++) {
          skillsList.push(skills.data.data.skills[i].skill);
        }
        setSkills(skillsList);

        //Get all project thumbnails and images from DB
        const projects = await IndexAPI.get(`/projects`);
        setProjects(projects.data.results);

        //Adds all the projects in project_images to the projectThumbnailArray
        const projectThumbnailArray = [];
        const thumbnailFiles = Object.keys(projectThumbnails);
        for (let i = 0; i < projects.data.results[0].length; i++) {
          if (
            projectThumbnailArray.indexOf(
              projects.data.results[0][i].thumbnail
            ) === -1
          ) {
            projects.data.results[0][i].module =
              projectThumbnails[projects.data.results[0][i].thumbnail];
            projectThumbnailArray.push(projects.data.results[0][i]);
          }
        }

        //Loops through the projectThumbnailArray
        const projectTitles = [];
        for (let i = 0; i < projectThumbnailArray.length; i++) {
          const tempArray = [];
          //Loops through all data provided from project_images
          for (let j = 0; j < projects.data.results[0].length; j++) {
            //Checks if the current item in project_images pertains to the current project
            if (
              projects.data.results[0][j].project ===
              projectThumbnailArray[i].project
            ) {
              tempArray.push(projects.data.results[0][j]);
            }
          }
          const key = projectThumbnailArray[i].project;
          const tempObject = {};
          tempObject[key] = [tempArray];
          if (projectTitles.indexOf(projectThumbnailArray[i].project) === -1) {
            projectTitles.push(projectThumbnailArray[i].project);
          }
          currentProjectThumbnailArray.push(tempObject);
        }

        //Filters out duplicate project thumbnail objects
        let exists = false;
        const filteredProjectThumbnailArray = [];
        for (let i = 0; i < currentProjectThumbnailArray.length; i++) {
          if (filteredProjectThumbnailArray.length > 0) {
            for (let j = 0; j < filteredProjectThumbnailArray.length; j++) {
              if (
                Object.keys(currentProjectThumbnailArray[i])[0] ===
                Object.keys(filteredProjectThumbnailArray[j])[0]
              ) {
                exists = true;
              }
            }
            if (exists === false) {
              filteredProjectThumbnailArray.push(
                currentProjectThumbnailArray[i]
              );
            }
          } else {
            filteredProjectThumbnailArray.push(currentProjectThumbnailArray[0]);
          }
          exists = false;
        }
        setAllThumbnails(filteredProjectThumbnailArray);

        const primaryThumbnailArray = [];
        for (let i = 0; i < filteredProjectThumbnailArray.length; i++) {
          for (
            let j = 0;
            j <
            filteredProjectThumbnailArray[i][
              Object.keys(filteredProjectThumbnailArray[i])[0]
            ][0].length;
            j++
          ) {
            if (
              filteredProjectThumbnailArray[i][
                Object.keys(filteredProjectThumbnailArray[i])[0]
              ][0][j].primary_image === 1
            ) {
              primaryThumbnailArray.push(
                filteredProjectThumbnailArray[i][
                  Object.keys(filteredProjectThumbnailArray[i])[0]
                ][0][j]
              );
            }
          }
        }

        setTitles(projectTitles);
        setThumbnails(primaryThumbnailArray);
        setFilteredThumbnails(primaryThumbnailArray);

        //Adds all the projects in project_tech to the projectTechArray
        const projectTechArray = [];
        for (let i = 0; i < projects.data.results[1].length; i++) {
          if (
            projectTechArray.indexOf(projects.data.results[1][i].project) === -1
          ) {
            projectTechArray.push(projects.data.results[1][i].project);
          }
        }

        //Loops through the projectArray
        const currentProjectTechArray = [];
        for (let i = 0; i < projectTechArray.length; i++) {
          const tempArray = [];
          //Loops through all data provided from project_tech
          for (let j = 0; j < projects.data.results[1].length; j++) {
            //Checks if the current item in project_tech pertains to the current project
            if (projects.data.results[1][j].project === projectTechArray[i]) {
              tempArray.push(projects.data.results[1][j].technology);
            }
          }
          const key = projectTechArray[i];
          const tempObject = {};
          tempObject[key] = [tempArray];
          currentProjectTechArray.push(tempObject);
        }
        setTechnology(currentProjectTechArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const filterProjects = async (skill) => {
    try {
      const techProjects = [];
      for (let i = 0; i < technology.length; i++) {
        const projectsTech = technology[i][Object.keys(technology[i])][0];
        for (let j = 0; j < projectsTech.length; j++) {
          if (projectsTech[j] === skill) {
            techProjects.push(Object.keys(technology[i])[0]);
          }
        }
      }

      const filteredThumbnails = [];
      for (let i = 0; i < techProjects.length; i++) {
        for (let j = 0; j < thumbnails.length; j++) {
          if (techProjects[i] === thumbnails[j].project) {
            filteredThumbnails.push(thumbnails[j]);
          }
        }
      }
      setFilteredThumbnails(filteredThumbnails);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <HeaderC />

      <div className="container">
        <div className="title-div">
          <p className="title">portfolio</p>
        </div>
        <div className="create-project-div">
          <div className="grid skill-filters">
            <div className={filterButtons}>
              {skills.map((skill, index) => {
                // if(filter){
                return (
                  <button
                    className="skill"
                    key={index}
                    onClick={() => filterProjects(skill)}
                  >
                    {skill}
                  </button>
                );
                // }
              })}
            </div>
            <img
              className="filter-icon"
              src="../../images/filter-solid.svg"
              onClick={() => displayFilter()}
            />
          </div>
        </div>
        <div className="portfolio-thumbnail-div">
          {filteredThumbnails.map((thumbnail, thumbnailIndex) => {
            return (
              <div key={thumbnailIndex}>
                <div
                  className="portfolio-item-div"
                  key={thumbnailIndex}
                  onClick={() =>
                    history.push(`/portfolio/${thumbnail.project}`)
                  }
                >
                  <div className="portfolio-project">
                    <img
                      className="project-thumbnail"
                      src={thumbnail.module.default}
                    />
                    <div className="thumbnail-overlay thumbnail-overlay--blur">
                      <div className="thumbnail-title-div">
                        {titles[thumbnailIndex].toLowerCase()}
                      </div>
                      <div className="grid buttons-div">
                        <div className="tech-used">
                          {technology.map((tech, techIndex) => {
                            if (thumbnailIndex === techIndex) {
                              return (
                                <div
                                  className="grid project-tech"
                                  key={techIndex}
                                >
                                  {tech[titles[techIndex]][0].map(
                                    (t, index) => {
                                      return <button key={index}>{t}</button>;
                                    }
                                  )}
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default PortfolioC;
