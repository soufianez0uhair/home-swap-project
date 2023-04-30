function WhyText({title, description}) {
  return (
    <>
      <div className="lc-block">
          <div editable="rich">
              <h2 className="fw-bold display-6">{title ? title : ''}</h2>
            </div>
          </div>
          <div className="lc-block mb-3">
            <div editable="rich">
              <p className="lead fw-bold">{description ? description : ''}</p>
          </div>
      </div>
    </>
  )
}

export default WhyText;