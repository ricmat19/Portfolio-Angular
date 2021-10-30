import { Component } from "@angular/core";
// import IndexAPI from "../../../../apis/indexAPI";

export interface Project {
  project: string,
  thumbnails: string,
  primaryImage: string,
  projectTech: string,
}

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html'
})

export class AdminUpdateProjectComponent{

  project = {};
  files = [];
  projectImages = [];
  projectFiles = [];
  primaryImage = '';
  skills = [];
  projectSkills = [];

  titles = [];
  titleInput = '';
  thumbnails = [];
  tech = [];
  oldTitle = '';

  // ngOnInit(){
  //   this.updateProject(this.titleInput, this.projectFiles, this.primaryImage, this.projectSkills, this.oldTitle)
  // }

  // updateProject(title: any, projectFiles: any, primaryImage: any, projectSkills: any, oldTitle: any){
  //   return this.http.push(`http://localhost:3000/projects/update-project`, [title, projectFiles, primaryImage, projectSkills, oldTitle]).subscribe((res) => {
  //       this.project = res;
  //       console.log(this.project)
  //     }, (err) => {
  //       console.log(err)
  //     }
  //   );
  // }

  //   try{

  //     projectSet = [];
  //     function importAll(projects) {
  //       let images = {};
  //       projects.keys().forEach((index) => {
  //         images[index.replace("./", "")] = projects(index);
  //         Object.keys(images).forEach((key) => {
  //           projectSet.push(key);
  //           setProjectImages([...new Set(projectSet)]);
  //         });
  //       });
  //     }
  //     importAll(require.context("../../images/projects"));

  //     setTitle(props.title);
  //     setOldTitle(props.title);

  //     const titlesArray = [];
  //     for (let i = 0; i < props.thumbnails.length; i++) {
  //       titlesArray.push(Object.keys(props.thumbnails[i])[0]);
  //     }
  //     setTitles(titlesArray);

  //     //Sets the full list of files
  //     const filesArray = [];
  //     for (let i = 0; i < props.thumbnails.length; i++) {
  //       filesArray.push(props.thumbnails[i][titles[i]][0][0]["thumbnail"]);
  //     }
  //     setFiles(filesArray);

  //     //Sets list of all of the files pertaining to this project
  //     const projectFilesArray = [];
  //     for (let i = 0; i < props.thumbnails.length; i++) {
  //       if (Object.keys(props.thumbnails[i]).toString() === props.title) {
  //         for (
  //           let j = 0;
  //           j < props.thumbnails[i][props.title][0].length;
  //           j++
  //         ) {
  //           projectFilesArray.push(
  //             props.thumbnails[i][props.title][0][j]["thumbnail"]
  //           );
  //         }
  //       }
  //     }
  //     setProjectFiles(projectFilesArray);

  //     //Get all skills from DB
  //     const skills = await IndexAPI.get(`/skills`);
  //     const skillsArray = [];
  //     for (let i = 0; i < skills.data.results.length; i++) {
  //       skillsArray.push(skills.data.results[i].skill);
  //     }
  //     setSkills(skillsArray);

  //     //Sets list of all of the files pertaining to this project
  //     const projectTechArray = [];
  //     for (let i = 0; i < props.tech.length; i++) {
  //       if (Object.keys(props.tech[i]).toString() === props.title) {
  //         for (let j = 0; j < props.tech[i][props.title][0].length; j++) {
  //           projectTechArray.push(props.tech[i][props.title][0][j]);
  //         }
  //       }
  //     }
  //     setProjectSkills(projectTechArray);

  //     if (props.thumbnails === []) {
  //       setThumbnails([]);
  //     } else {
  //       setThumbnails(props.thumbnails[0]);
  //     }

  //     if (props.tech === []) {
  //       setTech([]);
  //     } else {
  //       setTech(props.tech[0]);
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // skillSet = async (skillInput: HTMLTextAreaElement, checked) => {
  //   try {

  //     if (checked) {
  //       this.skills.push(skillInput)
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // projectSet = async (imageInput: HTMLTextAreaElement, checked) => {
  //   try {

  //     if (checked) {
  //       this.tech.push(imageInput);
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  updateProject = async () => {
    try {

      // await IndexAPI.put("/projects/update-project", {
      //   title: this.titleInput,
      //   projectFiles: this.projectFiles,
      //   primaryImage: this.primaryImage,
      //   projectSkills: this.projectSkills,
      //   oldTitle: this.oldTitle,
      // });

      this.titleInput = "";

      // props.setUpdatedProject(updatedProject)
    } catch (err) {
      console.log(err);
    }
  };

}
