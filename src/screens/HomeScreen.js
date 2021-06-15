import React, { useState, useEffect, useContext } from "react";
import StackGrid from "react-stack-grid";
import { NoteItem } from "../components/NoteItem";
import { SearchBar } from "../components/SearchBar";
import { MdNoteAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { map } from "lodash";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const HomeScreen = () => {
  const {
    user: { id },
  } = useContext(AuthContext);
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes([]);
    axios
      .get(`${API_URL}/notes/${id}`)
      .then(({ data }) => {
        setNotes(data);
      })
      .catch(({ response }) => {
        const { status } = response;
        if (status === 404) {
          setNotes([0, "Aún no tienes notas creadas"]);
        }
      });
  }, []);

  return (
    <>
      <div className="header-content">
        <SearchBar setNotes={setNotes} />
        <div className="btn container-nueva-note" id="container-btn">
          <button
            className="btn btn--blue btn--radius-2 custom-add-note"
            onClick={() => history.push("/note")}
          >
            <MdNoteAdd />
            Nueva
          </button>
        </div>
      </div>

      {notes[0] == 0 ? (
        <h3 key={0}>{notes[1]}</h3>
      ) : (
        <StackGrid columnWidth={240} gutterWidth={14} gutterHeight={14} key={1}>
          {map(notes, ({ id, title, content, color }) => (
            <NoteItem
              key={id}
              id={id}
              title={title}
              color={color}
              content={content}
            />
          ))}
        </StackGrid>
      )}
    </>
  );
};
