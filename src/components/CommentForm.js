import React , {Component } from 'react';
import {Button , Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Control , LocalForm , Errors} from 'react-redux-form';

const required = (val)=> val && val.length;
const maxLength = (len) => (val)=> !(val) || (val.length<=len);
const minlength = (len) => (val)=> (val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        
        this.state={
            isModalOpen:false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        alert(JSON.stringify(values));
    }
    render()
    {
        return(
            <>
                <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <Button outline secondary onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                </div>
            </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                            <Label htmlFor="Rating" className="col-12"> Ratings </Label>
                            <Col md={{size:12}}>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                    </Row>
                    <Row className="form-group">
                            <Label htmlFor="yourname" className="col-12"> Your Name </Label>
                            <Col md={{size:12}}>
                                <Control.text model=".yourname" name="yourname" 
                                id="yourname" className="form-control" 
                                placeholder="Your Name"
                                validators={{
                                    required,minLength:minlength(3),maxLength:maxLength(15)
                                }}/>
                                <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required:"Required",
                                                minLength:"Must be Greater Than 2 Characters",
                                                maxLength:"Must Be 15 Characters or Less"
                                            }} 
                                         />
                            </Col>
                    </Row>
                    <Row className="form-group">
                            <Label htmlFor="message" className="col-12"> Message </Label>
                            <Col md={{size:12}}>
                                <Control.textarea model=".message" name="message" 
                                id="message" className="form-control" placeholder="Message"
                                rows="6"/>
                            </Col>
                    </Row>
                    <Row className="form-group">
                        <Col >
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                       
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
            </>
            
        );
    }


}

export default CommentForm;
