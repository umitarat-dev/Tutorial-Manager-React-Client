import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import EditTutorial from './EditTutorial';
import { useState } from 'react';

const TutorialList = ({tutorials, deleteTutorial, editTutorial}) => {

    const [editItem, setEditItem] = useState("");

    //! Test data for showing in the table (veri çekidikten sonra bu kısım silinecek)
    // let tutorials = [
    //     {
    //         id: 1, 
    //         task: 'React', 
    //         description: 'React is a JavaScript library for building user interfaces.'
    //     },
    //     {
    //         id: 2, 
    //         task: 'HTML', 
    //         description: 'HTML is the standard markup language for creating Web pages.'
    //     }
    // ]

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {tutorials?.map((item) => {
            const { id, task, description } = item;
            return (
              <tr key={id}>
                <th>{id}</th>
                <td>{task}</td>
                <td>{description}</td>
                <td className="text-center text-nowrap">
                  <FaEdit 
                    
                    // modalı trigger edecek buttona şu kodları yazıyoruz;
                    data-bs-toggle="modal" 
                    data-bs-target="#edit-modal"
                    
                    size={20}
                    className="me-2 text-warning cursor-pointer"
                    // onClick={() => editTutorial(id, "css","stylesheet")}  //! edit fonksiyonunu çağırıyoruz.
                    onClick={() => setEditItem(item)}  //! edit fonksiyonunu çağırıyoruz.
                  />
                  <AiFillDelete
                    size={22}
                    className="text-danger cursor-pointer"
                    onClick={() => deleteTutorial(id)}  //! delete fonksiyonunu çağırıyoruz.
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditTutorial editTutorial={editTutorial} editItem={editItem}/>
    </div>
  );
};

export default TutorialList;
