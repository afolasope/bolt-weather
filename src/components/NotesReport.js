import React, { useState } from 'react';
import { useDetailsContext } from '../context/details_context';
import { v4 as uuidv4 } from 'uuid';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';

const NotesReport = ({ id }) => {
  const { notes, addToNote } = useDetailsContext();
  const [noteInput, setNoteInput] = useState();
  const handleAddNote = () => {
    if (noteInput) {
      addToNote(id, noteInput, uuidv4());
    }
  };

  return (
    <section className="section-wrapper notes-wrapper">
      <h3 className="note-title">Notes Report</h3>
      <textarea
        name="text"
        id="text"
        cols="30"
        rows="10"
        onChange={(e) => setNoteInput(e.target.value)}
      ></textarea>

      <button className="add-note" onClick={handleAddNote}>
        Add Note
      </button>
      {notes[id] && (
        <ul className="note-items">
          {notes[id].map(({ textId, text }) => {
            return (
              <li className="note-item" key={textId}>
                <p>{text}</p>
                <div className="note-cta">
                  <EditNote textId={textId} id={id} />
                  <DeleteNote textId={textId} id={id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default NotesReport;
