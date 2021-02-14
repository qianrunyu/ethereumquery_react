import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  //define dynamic class
  let wrapperClass = "form-group";
  if (props.error && props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <b>
        <label htmlFor={props.id}>{props.uiDisplay} </label>
      </b>
      <div className="field">
        <input
          id={props.id}
          type="text"
          name={props.name}
          className="form-control"
          onChange={props.onChange}
          value={props.value}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string, 
  error: PropTypes.string
};

TextInput.defaultProps = {
  error: ""
};

export default TextInput;
