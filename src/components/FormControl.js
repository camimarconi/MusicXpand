function FormControl(props) {
    return (
        <div>
            <input
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default FormControl;