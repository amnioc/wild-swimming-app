import { postComments } from "./utils/ comments-utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const AddCommentForm = () => {
  const { user, isAuthenticated} = useAuth0();


  const params = useParams();
  const location_Id =params.id;
const[userName, setUserName]= useState('water_baby')
const[submitting, setSubmitting]= useState(false);
const[bodyMessage, setBodyMessage]= useState("")
const [err, setErr] = useState("");
const[commentsList, setCommentsList]= useState("");
const[message, setMessage]= useState("");

const handleSubmit = (event:any)=>{
  event.preventDefault();
    const inputComment ={
     name:userName,
     body:bodyMessage,
    };
setCommentsList((currentComments)=>{
  return ([inputComment, ...currentComments])})
                    setMessage("We have loaded your comment");
                     setErr("")
                     setSubmitting(true);
                     postComments(location_Id, inputComment).catch((err) => {
                      if(body === ""){
                      setMessage("Please enter a comment")}
                      else{
                          setCommentsList((currentComments) => {
                        return  [...currentComments]}).then((copyArray)=>{
                        copyArray.shift();
                        })
                          setErr("Something went wrong!, please try again!");
                                              ;
                                    }
                            })
                            setBodyMessage("")
                            setSubmitting(false);
                              };
  return (
  <div className="commentsform">
  <form  onSubmit={handleSubmit}>
    <h3> Post a New Comment</h3>
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
  </div>
  )
};
export default AddCommentForm;