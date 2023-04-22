const Control = ({ item, id }) => {
  return (
    <>
      <label htmlFor={item.name} className="form-label">
        {item.label}
      </label>

      <input type={item.type} name={item.name} id={id} className="form-input" />
    </>
  )
}

export default Control
