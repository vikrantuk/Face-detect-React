import React, { Component } from 'react';
import './SignIn.css'


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }
    onSignInEmail= event => {
        this.setState({email: event.target.value})
    }
    onSignInPassword= event => {
        this.setState({pass: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('https://hidden-dusk-43887.herokuapp.com/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.pass
            })
        }).then(res => res.json()).then(data => {
            if(data.id){
                // console.log(data);
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
            else{
                alert("Wrong Credentials");
            }
        })
        
    }
    render(){
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onSignInEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onSignInPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit"
                                value="Sign in" 
                                onClick={this.onSubmitSignIn}
                                />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;