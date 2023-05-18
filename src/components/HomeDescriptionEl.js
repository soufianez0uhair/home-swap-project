function HomeDescriptionEl({name, value, icon: Icon}) {
  return (
    <div className="HomeDescripitonEl p-4 pr-1 border rounded" >
      <Icon style={{fontSize: '2.2rem', marginBottom: '1rem'}} />
      <h6 className="HomeDescriptionEl Lead">
  {`${value} ${name === "Dimension" ? "m2" : value < 2 ? name : name + 's' }`}</h6> </div>
  )
}

export default HomeDescriptionEl;