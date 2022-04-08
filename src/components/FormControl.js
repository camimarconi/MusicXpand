function FormControl(props) {

    console.log(props)

    return (
          <input
            className="mt-5"
            id="discover"
            name="keyword"
            onChange={props.onChange}
            value={props.value}
          />
    );

}

export default FormControl;