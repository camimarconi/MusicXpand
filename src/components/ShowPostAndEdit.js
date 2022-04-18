function ShowPostAndEdit(props) {
  return (
    <div>
      <img className={props.className} src={props.src} alt={props.alt} />
      <p>{props.p}</p>
    </div>
  );
}

export default ShowPostAndEdit;
