import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router';
import TweetAppService from '../../utilities/TweetAppService';
import { useAuth } from '../../utilities/Auth';
import axios from 'axios';

function Reply() {
  const [refreshKey,setRefreshKey] = useState(0);
  const [comments,setComments]= useState();
  const [commentss, setCommentss] = useState([]);
  
  const [Tweets,setTweets]= useState("");
  const current= new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const service = new TweetAppService();
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("user-data"));
    const dataPoint = JSON.parse(localStorage.getItem("tweet"));
    const auth = useAuth();

    


    useEffect(() => {
        async function fetchTweets() {
        const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/allcomments/${dataPoint.userName},${dataPoint.tweetId}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            
          }
        });
        console.log(response.data);
      setCommentss(response.data);
      }
      fetchTweets();
    }, [refreshKey]);
    

    const handleComment = (e) =>{
      
      e.preventDefault();
      let comment = {
        tweetid: dataPoint.tweetId,
        comment: comments,
        username: dataPoint.userName,
        name: data.username
      }
      service.postComment(comment);
      
      setComments(old=> old="");

      setTimeout(()=>{
          
        setRefreshKey(old => old+1);
      },1000);
     
    }
     function fetchTweet() {
      
      setTweets(data);
    }

    function DateTweets(data) {
      var date = new Date(data); 
     // var current = date.getTime(); 
      const date1 = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      return date1;
    }
  return (
    <div className="h1">
      <div className="height">
     <div className="card" id="color1">
       
      <div className="tweet card-body">
        <h6 className="card-title" id="uname">{dataPoint.userName}</h6>
        {'\n'} 
        <p className="date">{DateTweets(dataPoint.tweetDate)}</p>
        {'\n'} 
        <p className="tweetdata card-text">{dataPoint.tweets}</p>
        </div>
      </div>
      </div>
   
     
    
  

    <div className="comp">
    <div className="card">
        <div className="tweet card-body">
          <h6 class="card-title"></h6>
          {'\n'} 
          <p className="date">{date}</p>
          {'\n'} 

        
          </div>  
         
          
            
             <div className="form-outline">
             <textarea class="form-control" id="textAreaExample1" rows="4" onChange={e=>setComments(e.target.value)} value={comments}></textarea>
             
             <br/>
             <button type="button" class="btn btn-primary" onClick={handleComment}>Submit</button>
            </div>       
            
             
        
    </div>

    {commentss.map((dataP, index) => (
    <div className="card" key={index}>

      <div className="tweet card-body">
        <h6 className="card-title">{dataP.firstName}</h6>
        {'\n'} 
        <p className="date"> replying to @{dataP.username}</p>
        {'\n'} 
        <p className="tweetdata card-text">{dataP.comments}</p>
        </div>

    </div>))}
   

    </div>
    </div>
  )
}

export default Reply