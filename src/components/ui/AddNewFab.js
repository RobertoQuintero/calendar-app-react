import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

const AddNewFab = () => {
  const dispatch = useDispatch();
  const triggerOpenModal = () => {
    dispatch(uiOpenModal());
  };
  return (
    <button className="btn btn-primary fab" onClick={triggerOpenModal}>
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default AddNewFab;
