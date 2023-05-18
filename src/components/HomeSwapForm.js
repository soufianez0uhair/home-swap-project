import { useState } from "react";

function HomeSwapForm({points, purpose, accommodationId, userId}) {
  const [swapRequest, setSwapRequest] = useState({
    accommodationId,
    points,
    purpose,

  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setSwapRequest({
      ...swapRequest,
      [name]: value
    })
  }
  return (
    <form className="HomeSwapForm">
      {points && <h1 className="HomeSwapForm__points">{points}</h1>}
      <div className="HomeSwapForm__group">
        <input type="date" className="HomeSwapForm__date" />
        <input type="date" className="HomeSwapForm__date" />
      </div>
      <div className="HomeSwapForm__group">
        {(purpose === 'undefined' || purpose === 'swap') && <button class="btn btn-primary" >Ask for a swap</button>}
      </div>
    </form>
  )
}

export default HomeSwapForm;