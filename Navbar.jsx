const Navbar = ({ streamContent, currentItem, setCurrentItem }) => {
  return (
    <div className="btn-container">
      {streamContent.map((item, index) => {
        return (
          <button
            key={item.id}
            onClick={() => setCurrentItem(index)}
            className={index === currentItem ? 'job-btn active-btn' : 'job-btn'}
          >
            {item.stream}
          </button>
        )
      })}
    </div>
  )
}

export default Navbar
