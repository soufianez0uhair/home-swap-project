import { Form } from "react-bootstrap";

const SwitchButton = ({ value, firstTerm, secondTerm }) => {
  return (
    <div className="d-flex">
      <label htmlFor="custom-switch">{firstTerm}</label>
      <div className="ms-4">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label={secondTerm}
        />
      </div>
    </div>
  );
};

export default SwitchButton;