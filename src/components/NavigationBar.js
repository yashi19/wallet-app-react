import React, {Component} from 'react';
import {MDBNavbar, MDBNavbarBrand} from "mdbreact";
import {Link} from "react-router-dom";
import '../styles/NavigationBar.css';

class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"DYNAMIC WALLET"
        }
    }

    componentWillMount() {
        if (window.innerWidth <= 400) {
           this.setState({
               title:""
           })
        } else {
            this.setState({
                title:"DYNAMIC WALLET"
            })
        }
    }

    render() {
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md">
                    <MDBNavbarBrand style={{cursor: "pointer"}}>
                        <Link id="dashboard-link" to="/">
                            <img src={process.env.REACT_APP_PUBLIC_URL + "logo.png"} className={"logo"} alt={this.state.title}/>
                            <strong  className="white-text">
                               {this.state.title}
                            </strong>
                        </Link>
                    </MDBNavbarBrand>
                </MDBNavbar>
            </div>
        );
    }
}

export default NavigationBar;