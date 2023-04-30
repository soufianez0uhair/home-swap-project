import React from "react";

function SplitScreen({children, img, reverse = 'false'}) {
  children = React.Children.toArray(children);
  const [ChildLeft] = children;

  return (
    <div className="container col-xxl-8 px-4 pt-5 mb-4">
      <div className={`row flex-lg-row${reverse ? '-reverse' : ''} align-items-center g-5 py-5`}>
        <div className="col-10 col-sm-8 col-lg-6">
          <img src={img} className="d-block mx-lg-auto img-fluid" alt="globe" loading="lazy" />
        </div>
        <div className="col-lg-6">
          {ChildLeft}
        </div>

      </div>
    </div>
  )
}

export default SplitScreen;