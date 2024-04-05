import React, { useState } from 'react';
import './listcard.scss';
import { BiChevronLeft, BiChevronRight, BiEdit, BiTrash } from 'react-icons/bi';
import { arrowClick, deleteItem, editTask } from '../../redux/taskSlice'; // Import the editTask action
import { useDispatch } from 'react-redux';

const ListCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...item });

  const ArrowClick = (string) => {
    dispatch(arrowClick(item, string));
  };

  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask({ ...item });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask(editedTask)); // Dispatch the editTask action with the edited task data
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
  <form onSubmit={handleSubmit} style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    border: '1px solid #ccc', 
    borderRadius: '10px', 
    padding: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding box shadow for card-like appearance
    maxWidth: '400px', // Limiting maximum width to prevent stretching
  }}>
    <input
      type="text"
      name="task"
      value={editedTask.task}
      onChange={handleChange}
      style={{ 
		fontFamily:"serif",
		fontSize:15,
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '0.5rem',
        width: '100%', // Making input full width
      }}
    />
    <select
      name="status"
      value={editedTask.status}
      onChange={handleChange}
      style={{ 
		fontFamily:"serif",
		fontSize:15,
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '0.5rem',
        width: '100%', // Making select full width
      }}
    >
      <option value="backlog">Backlog</option>
      <option value="inProgress">In Progress</option>
      <option value="done">Done</option>
    </select>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      width: '100%',
    }}>
      <button 
        type="submit" 
        style={{ 
          marginRight: '1rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        Save
      </button>
      <button 
        type="button" 
        onClick={handleCancelEdit} 
        style={{ 
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  </form>
</div>

      ) : (
        <ul className={` ${item.status === 'done' ? 'completed menu' : 'menu'}`}>
          <li>
            <p>{item._id}</p>
          </li>
          <li>
            <p>{item.task}</p>
          </li>
          <li>
            <p>{item.status}</p>
          </li>
          <li>
            <button
              disabled={item.status === 'backlog'}
              onClick={() => ArrowClick('left')}
            >
              <BiChevronLeft />
            </button>
            <button
              disabled={item.status === 'done'}
              onClick={() => ArrowClick('right')}
            >
              <BiChevronRight />
            </button>
            <button onClick={handleEdit}>
              <BiEdit color='green' />
            </button>
            <button onClick={handleDelete}>
              <BiTrash color='red' />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListCard;
