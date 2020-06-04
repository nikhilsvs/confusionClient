import React ,{Component} from 'react';
import {Navbar,NavbarBrand,Jumbotron} from 'reactstrap';

class Header extends Component{
    render(){
        return(
            <>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We Take Inspiration from the World's Best Cusiness , and Create a unique fusion Experience, Our Lipmacking creation will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default Header