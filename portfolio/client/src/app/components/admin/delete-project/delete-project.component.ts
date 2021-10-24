
import { Component } from "@angular/core";

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html'
})

export class AdminDeleteProjectComponent{

  title = 'props.title';

  deleteProject = async (title) => {
    try {
      await IndexAPI.delete(`/admin/portfolio/${title}/delete`);
    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../../../apis/indexAPI";
// import PropTypes from "prop-types";

// const DeleteC = (props) => {

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setTitle(props.title);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [props, title]);

//   return (

//   );
// };

// DeleteC.propTypes = {
//   title: PropTypes.string,
// };

// export default DeleteC;
