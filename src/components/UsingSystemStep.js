import React from 'react'

const UsingSystemStep = ({img, title}) => {
  return (
    <div style={{maxWidth: "200px", margin: '0 auto'}} >
      <img className="img-fluid" style={{marginBottom: '.5rem'}} src={img} alt={title} />
      <p className="">{title}</p>
    </div>
  )
}

export default UsingSystemStep