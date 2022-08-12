import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './Feedback.css';

export const Feedback = ()=> {
    const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    msg: "",
  });

  const[submitted, setSubmitted]=useState(false);
  const[valid, setValid]=useState(false);

  const handleEmailInputChange=(event)=>{
    setFields({...fields,email:event.target.value})
  }
  const handleMsgInputChange=(event)=>{
    setFields({...fields, msg:event.target.value})
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(fields.email && fields.msg){
      setValid(true);
    }
    setSubmitted(true);
    console.log(fields)
  }
return(
    
  <div className="form-containr1">
   {/* <NavBar></NavBar> */}
    <form className="feedback-form1" onSubmit={handleSubmit}>
    <h4>Tell us about your experience!</h4>
        {submitted && valid ? <div className="success-message1">Thank you! Your feedback was submitted</div> :null }
      <input type="Email"
        onChange={handleEmailInputChange}
        value={fields.email}
        className="form-field1"
        placeholder="Email"
        name="email"/>
        {submitted && !fields.email ? <span>Please enter an email</span>:null }
      <textarea
        onChange={handleMsgInputChange}
        value={fields.msg}
        className="form-field1"
        placeholder="Write feedback here.."
        name="msg"/>
        {submitted && !fields.msg ? <span>Please enter the feedback</span> : null }
      <button
        className="form-field"
        type="submut">Submit Feedback</button>
    </form>
    
  </div>
);

};

export default Feedback;
