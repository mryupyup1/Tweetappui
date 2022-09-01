import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utilities/Auth';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './Login.css';
import logo from '../../asset/tweetlogo.jfif';
import TweetAppService from '../../utilities/TweetAppService';



export function Login() {
    const errors = {username:"",password:""};
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(errors);
    const auth = useAuth();
    const navigate = useNavigate();
    const service = new TweetAppService();
   

    function handleSubmit(event) {
        event.preventDefault();
        if(validate()){
        service.login(username,password);
        auth.login(username);
        navigate('/');
        }
            
        }
      
      
      function validate(){
          let input = {
            username,
            password
          };
          let errors = {
              username:"",
              password:""
          };
          let isValid = true;
       
          if (!input.username) {
            isValid = false;
            errors.username = "Please enter your username.";
          }
      
          if (typeof input.username !== "undefined") {
            const re = /^\S*$/;
            if(input["username"].length < 3 || !re.test(input["username"])){
                isValid = false;
                errors.username = "Please enter valid username.";
            }
          }
      
          
      
          
      
          if (!input.password) {
            isValid = false;
            errors.password = "Please enter your password.";
          }
      
          
      
          if (typeof input.password !== "undefined") {
            if(input.password.length < 6){
                isValid = false;
                errors.password = "Please add at least 6 charachter.";
            }
          }
      
          
      
          setError(errors);
      
          return isValid;
      }
    

    

    const handleLogin = (e) => {
        
        e.preventDefault();
        service.login(username,password);
        auth.login(username);
        navigate('/');
    }

    return (
        <div>
            
            <Container>
            
                <div className="logo"><img src={logo} className="App-logo"></img></div>
                <Row className="">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />
                                <div className="text-danger">{error.username}</div>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
                                <div className="text-danger">{error.password}</div>
                            </Form.Group>

                            
                            <div className="col">
     
                            <p className='forgotpass-text'><a href="/forgotpassword">Forgot password?</a></p>

                            </div>
  
                        
                            <Button type="submit" variant="success btn-block"  onClick={handleSubmit} >
                                Login
                            </Button>

                            

                            <div className="text-center">
                            <p className='register-text'>Not a member? <a href="/signup">Register</a></p>
                            </div>

                              </Form>
                    </Col>
                </Row>
             {/* <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2021 . All Rights Reserved.</h6> */}
             
            </Container>
            
        </div>
    )
}
