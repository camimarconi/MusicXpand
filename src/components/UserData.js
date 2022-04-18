function handleSubmit(event) {
  event.preventDefault();
}

function UserData(props) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="custom-file">
        <input
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.placeholder}
        />
      </div>

      <div className="mb-3">
        <div>
          <button
            className="btn btn-outline-secondary mb-3"
            type="submit"
            id="button"
            onClick={props.onClick}
          >
            Button
          </button>
        </div>
        {/* <h2 className="result d-flex flex-row">Playlist</h2> */}
      </div>
    </form>
  );
}

export default UserData;
