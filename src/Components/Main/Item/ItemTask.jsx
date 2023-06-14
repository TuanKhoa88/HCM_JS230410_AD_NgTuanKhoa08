import React, { useState, useEffect } from 'react'

export default function ItemTask({ item, index, handleDelete, handleUpdate }) {
  const [update, setUpdate] = useState(null);
  const [editedLearn, setEditedLearn] = useState(item.learn);
  const [editedDate, setEditedDate] = useState(item.date);
  const [editedStatus, setEditedStatus] = useState(item.status);
  const [editedName, setEditedName] = useState(item.name);
  const [error, setError] = useState("");


  const handleValidation = () => {
    let isValid = true;
    if (editedLearn === "" && editedDate === "" && editedName === "" && editedStatus === "Choose") {
      setError("Please fill out the information completely!");
      return false;
    }
    if (editedLearn.trim() === "") {
      setError("Please enter content");
      isValid = false;
    } else if (editedDate === "") {
      setError("Please select a due date");
      isValid = false;
    } else if (editedStatus === "Choose") {
      setError("Please select a status");
      isValid = false;
    } else if (editedName.trim() === "") {
      setError("Please enter the name");
      isValid = false;
    } else {
      setError("");
    }
    return isValid;
  };
  useEffect(() => {
    if (error !== "") {
      const timeh = setTimeout(() => {
        setError("");
      }, 2000);

      return () => {
        clearTimeout(timeh);
      };
    }
  }, [error]);

  const handleSave = () => {
    if (handleValidation()) {
      const updatedUsers = {
        id: item.id,
        learn: editedLearn,
        date: editedDate,
        status: editedStatus,
        name: editedName
      }
      handleUpdate(updatedUsers);
      setUpdate(null);
    }
  }
  return (
    <tr>
      <td>{index + 1}</td>
      {update === null ? (
        <>
          <td>{item.learn}</td>
          <td>{item.date}</td>
          <td>{item.status}</td>
          <td>{item.name}</td>
          <td className="active">
            <button className="update-btn" onClick={() => setUpdate(item)}>
              Update
            </button>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </td>
        </>
      ) : (
        <>
          <td>
            <input
              type="text"
              value={editedLearn}
              onChange={(e) => setEditedLearn(e.target.value)}
            />
          </td>
          <td>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </td>
          <td>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="Pending">Pending</option>
              <option value="Full fill">Full fill</option>
              <option value="Reject">Reject</option>
            </select>
          </td>
          <td>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </td>
          <td className="active">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
            {error && <p className="error">{error}</p>}
          </td>
        </>
      )}
    </tr>
  )
}
