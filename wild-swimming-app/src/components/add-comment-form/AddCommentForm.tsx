import { postComments } from "./utils/ comments-utils";
import {  useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../loginbutton/loginbutton";

const AddCommentForm = ({ setLocationComments, locationComments }) => {


  const { user } = useAuth0();
  const params = useParams();
  const location_Id =params.id;
 

const[submitting, setSubmitting]= useState(false);
const[bodyMessage, setBodyMessage]= useState("")
const [err, setErr] = useState("");

const[message, setMessage]= useState("");



const handleSubmit = (event:any)=>{
  event.preventDefault();
    const inputComment ={
     name:user?.name,
     body:bodyMessage,
     location_id:location_Id,
     
    };
   console.log(inputComment)
setLocationComments((currentComments)=>{
  return ([inputComment, ...currentComments])})
                    setMessage("We have loaded your comment");
                     setErr("")
                     setSubmitting(true);
                     postComments(inputComment).catch((err) => {
                      if(body === ""){
                      setMessage("Please enter a comment")}
                      else{
                          setLocationComments((currentComments) => {
                        return  [...currentComments]}).then((copyArray)=>{
                        copyArray.shift();
                        })
                          setErr("Something went wrong!, please try again!");
                                              ;
                                    }
                            })
                            setBodyMessage("")
                            setSubmitting(false);
                           setMessage("")
                              };
  return (
  <div className="commentsform">
    
    {user !== undefined && (
        <div>
          <p>Have you swam here, {user.name}? We'd love to hear about it...</p>
          
        </div>
      )}
       {user === undefined && (
        <div>
         <p> <LoginButton />
              to leave a comment</p>
          
        </div>
      )}
      
  <form  onSubmit={handleSubmit}>
    

    <textarea className="grid_item1"
              value={bodyMessage}
              required
              disabled={submitting}
              onChange={(event)=> setBodyMessage(event.target.value)}
              />
<button className="button" type="submit">
            + Comment!
        </button>
  </form>
  {err ? <p>{err}</p> :null}
        {!err ? <p>{message}</p> :null}
  </div>
  )
};
export default AddCommentForm;