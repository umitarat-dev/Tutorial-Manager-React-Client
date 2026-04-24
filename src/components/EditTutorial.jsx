import {useState, useEffect} from "react";

//! modal için kullandığımız component;
const EditTutorial = ({editTutorial, editItem}) => {

    const {id, task: newTask, description} = editItem;

    const [task, setTask] = useState(newTask);
    const [desc, setDesc] = useState(description);

    //? https://reactjs.org/docs/hooks-reference.html#usestate
    //! State degiskeninin degeri, 1.render ile initialState
    //! parametresinin ilk degerini alir. Dolayisiyle bu durumda
    //! prop'tan gelen ilk deger state'e aktarilir.
    //! Sonradan degisen props degerleri useState'e aktarilmaz.
    //! Eger props'tan gelen degerleri her degisimde useState'e
    //! aktarmak istersek useEffect hook'unu componentDidUpdate
    //! gibi kullanabiriz.

    //? componentDidUpdate
    //? newTitle veya description her degistiginde local task ve
    //? desc state'lerimizi gunceliyoruz.
    useEffect(() => {
        setTask(newTask);
        setDesc(description);
    }, [newTask, description]);


    const handleSave = (e) => {
        e.preventDefault();
        editTutorial(id, task, desc);
        setTask(''); 
        setDesc(''); 
    };

    
  return (
    <div 
        className="modal" 
        tabIndex="-1" 
        id="edit-modal"
        aria-labelledby="edit-modal-title"
        aria-modal="true"
        >
        <div className="modal-dialog">
          <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="edit-modal-title">Modal title</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="modal" 
                    aria-label="Close">
                  </button>
                </div>

                <div className="modal-body">

                    <div className="mb-3">
                        <label htmlFor="task" className="form-label">
                            Task
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="task"
                            placeholder="Enter your title"
                            value={task || ""}  //! controlled component hatası almamak için ekledik.
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="desc"
                          placeholder="Enter your Description"
                          value={desc || ""}  //! controlled component hatası almamak için ekledik.
                          onChange={(e) => setDesc(e.target.value)}
                          required
                        />
                    </div>

                </div>

                <div className="modal-footer">
                  {/* <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal">Close
                  </button> */}
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleSave}>Save
                  </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default EditTutorial;