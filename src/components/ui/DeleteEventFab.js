import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelted } from "../../actions/events";

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const deleteEvent = () => {
    dispatch(eventStartDelted());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={deleteEvent}>
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  );
};

export default DeleteEventFab;
