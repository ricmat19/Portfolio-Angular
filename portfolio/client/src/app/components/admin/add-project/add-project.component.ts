
import { Component } from "@angular/core";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html'
})

export class AddProjectComponent{

}

// import IndexAPI from "../../../../apis/indexAPI";

// const CreateC = () => {
//   const [projectImages, setProjectImages] = useState([]);
//   const [skills, setSkills] = useState([]);

//   const [project, setProject] = useState("");
//   const [thumbnails, setThumbnails] = useState([]);
//   const [primaryImage, setPrimaryImage] = useState("");
//   const [projectTech, setProjectTech] = useState([]);

//   const projectInput = useRef(null);

//   let projectSet = [];
//   function importAll(projects) {
//     let images = {};
//     projects.keys().forEach((index) => {
//       images[index.replace("./", "")] = projects(index);
//       Object.keys(images).forEach((key) => {
//         projectSet.push(key);
//         setProjectImages([...new Set(projectSet)]);
//       });
//     });
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //Get all skills from DB
//         const skills = await IndexAPI.get(`/skills`);
//         const skillsArray = [];
//         for (let i = 0; i < skills.data.results.length; i++) {
//           skillsArray.push(skills.data.results[i].skill);
//         }
//         setSkills(skillsArray);

//         importAll(require.context("../../images/projects"));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const createList = async (value, checked, setList, list) => {
//     try {
//       if (list === null) {
//         if (checked) {
//           setList(value);
//         }
//       } else {
//         if (checked) {
//           setList((list) => [...list, value]);
//         }
//       }

//       if (!checked) {
//         setList(list.filter((list) => list !== value));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const createProject = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(project);
//       console.log(thumbnails);
//       console.log(primaryImage);
//       console.log(projectTech);

//       await IndexAPI.post("/projects/add-project", {
//         project,
//         thumbnails,
//         primaryImage,
//         projectTech,
//       });
//       projectInput.current.value = "";

//       // props.setCreatedProject(createdProject)
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (

//   );
// };

// export default CreateC;
