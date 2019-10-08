import React, { Component } from 'react';

import './UserToolbar.css';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import Auth from '../../auth'
import UserStats from './UserStats'
import CurieStats from './CurieStats'
import steemconnect from 'steemconnect'
import NavPanel from '../navpanel/NavPanel';

class UserToolbar extends Component {
    
  constructor( props ) {
      super( props );
      this.state = { value: '' };
      this.auth = new Auth();
      //this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.authinfo = JSON.parse(localStorage.getItem('authtoken'));
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.props.getUserStats();
      // this.props.getCurieStats();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        
        var client = new steemconnect.Client({
            app: "becq",
            callbackURL: "https://becq.herokuapp.com/auth",//'https://www.becquerel.io',
            scope: ['login']
        });
        const self = this;

        const loginObj = {};
        if (this.state.value) loginObj.username = this.state.value;

        var accesstoken = "";

        client.login(loginObj, function (err, token) {
            if (err) return self.isLoading = false;
            client.setAccessToken(token);

            var auth = new Auth();
            auth.login(loginObj.username, token);
        });

        event.preventDefault();
    }   

    logout =  () => {
        // call the class that calls steemconnect
        this.auth.logout();
    };

   
  
 

  render() {

        

      return (

        <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">Becquerel</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <UserStats {...this.props}/>
            <CurieStats {...this.props}/>
            </Nav>
          <Nav pullRight>
                      {this.props.auth.isAuthenticated() ?
                          <NavItem eventKey={1} onClick={this.logout} href="">
                              {/* <div className="userprofileimage"/> */}
                              Logout @{this.authinfo.user}
                          </NavItem>
                          :
                          <Nav>
                              <br />
                              <form onSubmit={this.handleSubmit}>
                                  <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="username" />
                                  <input type="submit" value="Login" />
                              </form>
                          </Nav> 
            }
            
            </Nav>
            </Navbar.Collapse>
            </Navbar>
    //   <div className="usertoolbar">
    //       <ul className="nav justify-content-end">
    //         <li className="nav-item" >
    //         { this.props.auth.isAuthenticated() ?
    //         <a className="nav-link" onClick={this.logout} href="#">Logout @{this.authinfo.user}</a> :
    //         <a className="nav-link" onClick={this.login} href="#">Login</a>
            
    //         }
    //             </li>
    //             <li>
    //                 <UserStats/>
    //                 </li>
    //         </ul>

    //     </div>
        
     
      );
    
    
    
  }

  
}

export default UserToolbar;