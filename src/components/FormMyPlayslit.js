function FormMyPlaylist(props) {
  return (
    <div className="mb-3">
      <input
        id={props.id}
        className="form-control"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default FormMyPlaylist;
