function FormMyPlayslit(props) {
  return (
    <div className="mb-5">
      <h2>{props.label}</h2>
      <input
        id={props.id}
        className="form-control"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default FormMyPlayslit;
