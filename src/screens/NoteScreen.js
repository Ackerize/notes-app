import React, { useState, useEffect, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.umd";
import { AuthContext } from "../auth/AuthContext";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";

export const NoteScreen = () => {
  const [color, setColor] = useState("#aabbcc");
  const {
    user: { id },
  } = useContext(AuthContext);

  let { idNote } = useParams();

  const [note, setNote] = useState(null);

  const [values, handleInputChange, , updateState] = useForm({
    title: "",
    content: "",
    idUser: id,
  });

  useEffect(() => {
    if(idNote){
      axios.get(`${API_URL}/notes/find/${id}/${idNote}`).then(({ data }) => {
        const { title, content } = data;
        setNote(data);
        updateState({
          title,
          content,
          idUser: id,
        });
        setColor(data.color);
      });
    }
    
  }, []);

  const history = useHistory();

  const onDelete = () => {
    Swal.fire({
      title: "¿Deseas borrar esta nota?",
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#FF5555",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/notes/${idNote}`).then((result) => {
          Swal.fire(
            "¡Nota eliminada!",
            "La nota ha sido eliminada con éxito",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              history.push("/home");
            }
          });
        });
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...values,
      color
    };
    if (note) {
      axios
        .put(`${API_URL}/notes/${idNote}`, data)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: "¡Nota actualizada!",
            text: "La Nota ha sido actualizada con éxito",
            showConfirmButton: false,
            timer: 1400,
          });
          setTimeout(() => {
            history.push("/home");
          }, 1400);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      axios
        .post(`${API_URL}/notes/new`, data)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: "¡Nota creada!",
            text: "La nota ha sido creada con éxito",
            showConfirmButton: false,
            timer: 1400,
          });
          setTimeout(() => {
            history.push("/home");
          }, 1400);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
    console.log(data);
  };

  return (
    <>
      <div className="page-wrapper p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5 card-painting">
            <div className="card-heading heading-task">
            <IoMdArrowBack
                className="back-btn"
                onClick={() => {
                  history.push("/home");
                }}
              />
              <div className="title-container title-note-container">
                <h2 className="title title-note">Nueva nota</h2>
              </div>
            </div>
            <div className="card-body card-body-painting">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="name label-text">Titulo: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Contenido: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="content"
                        value={values.content}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Color: </div>
                  <div className="value">
                    <div className="input-group">
                      <HexColorPicker color={color} onChange={setColor} />
                    </div>
                  </div>
                </div>

                <div className="btn-groups">
                  <div className="btn" id="container-btn">
                    <button
                      className="btn btn--blue btn--radius-2"
                      type="submit"
                      id="btn-submit"
                    >
                      Guardar
                    </button>
                  </div>
                  {note && (
                    <div className="btn" id="container-btn-register">
                      <button
                        className="btn btn--red btn--radius-2"
                        type="button"
                        onClick={onDelete}
                      >
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
