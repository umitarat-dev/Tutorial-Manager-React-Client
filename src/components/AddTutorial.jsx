import { useState } from 'react';

const AddTutorial = ({ addTutorial }) => {
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // formun default submit davranışını/refresh engelliyoruz.
    addTutorial({ task: task, description: desc });
    setTask(''); // form submit edildikten sonra inputları temizliyoruz.
    setDesc(''); // form submit edildikten sonra inputları temizliyoruz.
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="display-6 text-danger">Add Your Tutorial</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Task
          </label>
          <input
            type="text"
            className="form-control"
            id="task"
            placeholder="Enter your title"
            value={task}
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button 
          className="btn btn-danger mb-4">Submit</button>
      </form>
    </div>
  );
};

export default AddTutorial;
