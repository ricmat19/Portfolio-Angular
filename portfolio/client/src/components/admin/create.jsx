import React, { useRef, useState } from 'react';

const CreateC = (props) => {

    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [newProject, setNewProject] = useState("")

    const titleInput = useRef(null);

    const createProject = async (e) =>{
        e.preventDefault()
        try{

            props.setNewProject(newProject)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            {/* Create To Do */}
            <div className="grid toDo-modal-grid">
                <label>TITLE</label>
                <input className="title" ref={titleInput} onChange={e => setTitle(e.target.value)} type="text" name="title" required/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>THUMBNAIL</label>
                <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} type="text" name="thumbnai"/>
            </div>
            <div>
                <button className="form-button" type="submit" onClick={createProject}>CREATE</button>
            </div>
        </div>
    )
}

export default CreateC;