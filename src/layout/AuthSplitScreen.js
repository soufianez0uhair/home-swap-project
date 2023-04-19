function AuthSplitScreen({img, child: Child}) {
  return (
    <div className="row min-vh-100 vw-100">
      <div className="col-sm-0 col-md-5 position-relative overflow-x-hidden">
        <img className="position-absolute h-100" src={img} alt="une image qui represente le house swap." />
      </div>
      <div className="col-sm-12 col-md-7 min-vh-100">
        <Child />
      </div>
    </div>
  )
}

export default AuthSplitScreen;