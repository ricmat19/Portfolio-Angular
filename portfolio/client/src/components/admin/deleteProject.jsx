import React, { useEffect, useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import PropTypes from "prop-types";

const DeleteC = (props) => {
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTitle(props.title);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props, title]);

  const deleteProject = async (title) => {
    try {
      await IndexAPI.delete(`/admin/portfolio/${title}/delete`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid add-project-modal">
      <div>Are you sure you want to delete &apos;{title}&apos;?</div>
      <button
        className="form-button"
        type="delete"
        onClick={() => deleteProject(title)}
      >
        Delete
      </button>
    </div>
  );
};

DeleteC.propTypes = {
  title: PropTypes.string,
};

export default DeleteC;
