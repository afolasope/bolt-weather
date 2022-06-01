import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useDetailsContext } from '../context/details_context';

const DeleteNote = ({ id, textId }) => {
  const { notes, deleteNote } = useDetailsContext();

  const handleDelete = () => {
    deleteNote(id, textId);
  };

  return (
    <div onClick={handleDelete}>
      <span>
        <MdDelete className=" btn-icon" />
      </span>
    </div>
  );
};

export default DeleteNote;
