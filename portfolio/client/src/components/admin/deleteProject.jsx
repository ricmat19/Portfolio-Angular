import React, { useEffect, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const DeleteC = (props) => {

    const [title, setTitle] = useState(props.title) 

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setTitle(props.title);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props, title]);

    const deleteProject = async (title) =>{
        try{
            const response = await IndexAPI.delete(`/admin/portfolio/${title}/delete`);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="grid add-project-modal">
            <div>Are you sure you want to delete '{title}'?</div>
            <button className="form-button" type="delete" onClick={e => deleteProject(title)}>Delete</button>
        </div>
    )
}

export default DeleteC;