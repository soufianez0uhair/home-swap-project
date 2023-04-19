import SignUpImg from '../assets/images/SignUp.png';
import SignUpForm from '../components/SignUpForm';

function SignUp() {
  return (
    <div className="row min-vh-100 vw-100">
      <div className="col-5 position-relative overflow-x-hidden">
        <img className="position-absolute h-100" src={SignUpImg} alt="une image qui represente le house swap." />
      </div>
      <div className="col-7 min-vh-100">
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp;