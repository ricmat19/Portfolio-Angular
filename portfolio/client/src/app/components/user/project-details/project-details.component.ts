import { Component } from "@angular/core";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})

export class ProjectDetailsComponent{

  title = '';
  githubLink = '';
  thumbnails = [];
  thumbnailIndex = 0;
  tech = [];

  slideThumbnailLeft = async () => {
    try {
      if (thumbnailIndex === 0) {
        setThumbnailIndex(thumbnails.length - 1);
      } else {
        let newThumbnail = thumbnailIndex - 1;
        setThumbnailIndex(newThumbnail);
      }
    } catch (err) {
      console.log(err);
    }
  };

  slideThumbnailRight = async () => {
    try {
      if (thumbnailIndex === thumbnails.length - 1) {
        setThumbnailIndex(0);
      } else {
        let newThumbnail = thumbnailIndex + 1;
        setThumbnailIndex(newThumbnail);
      }
    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../apis/indexAPI";
// import HeaderC from "../../standard/header/header.component";
// import FooterC from "../../standard/footer/footer.component";
// import LeftArrowC from "../../standard/left-arrow/left-arrow.component";
// import RightArrowC from "../../standard/right-arrow/right-arrow.component";

// function importAll(projects) {
//   let images = {};
//   projects.keys().forEach((index) => {
//     images[index.replace("./", "")] = projects(index);
//   });
//   return images;
// }
// const projectThumbnails = importAll(require.context("../images/projects"));

// const ProjectDetailsC = () => {
//   let parameters = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setTitle(parameters.project.toLowerCase());

//         //Fix: Add Github URL to DB
//         setGithubLink(`https://github.com/ricmat19/${parameters.project}`);

//         //Get project from DB
//         const project = await IndexAPI.get(`/portfolio/${parameters.project}`);

//         const projectThumbnailsArray = [];
//         //Loops through the array of images associated with this project
//         for (let i = 0; i < project.data.results[1].length; i++) {
//           //Gets the file name of the current project image
//           const projectFile = project.data.results[1][i].thumbnail;

//           //Loops through the array of imported images
//           for (let j = 0; j < Object.keys(projectThumbnails).length; j++) {
//             if (Object.keys(projectThumbnails)[j] === projectFile) {
//               projectThumbnailsArray.push(projectThumbnails[projectFile]);
//             }
//           }
//         }
//         setThumbnails(projectThumbnailsArray);
//         console.log(projectThumbnailsArray);

//         const projectTechArray = [];
//         //Loops through the array of technology associated with this project
//         for (let i = 0; i < project.data.results[0].length; i++) {
//           projectTechArray.push(project.data.results[0][i].technology);
//         }
//         setTechs(projectTechArray);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (

//   );
// };

// export default ProjectDetailsC;
