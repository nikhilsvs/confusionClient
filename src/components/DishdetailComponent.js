import React , {Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle,Button 
    , Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Link } from 'react-router-dom';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Control , LocalForm , Errors} from 'react-redux-form';
import {Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

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
        this.props.postComment(this.props.dishId,values.rating,values.yourname,values.message);
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
 
   
    
    function RenderComments({comments,postComment,dishId}){
        
        if(comments!=null)
        {
            const months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            const ans = comments.map((x)=>{
                var d = new Date(x.date)
                return(
                    <li className="list-unstyled">
                        <p className="m-1">{x.comment}</p>
                        <p className="m-1">--{x.author} , {months[d.getMonth()]} {d.getDate()} , {d.getFullYear()}</p>
                    </li>
                );
            });
            return (
                <>
                <ul className="list-unstyled">
                    {ans}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
                </>
            );
        }
        else{
            return (
                <div></div>
            );
        }
         
    }

    function RenderDish({dish}){
        if(dish!=null){
            return(

                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
    const DishDetail = (props) => {
        if(props.isLoading){
            return (
                <div className="conatiner">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return (
                <div className="conatiner">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
       else if(props.dish!=null)
        return(
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish = {props.dish}/>
                </div>  
                <div className="col-12 col-md-5">
                    <h4>Comments</h4>
                    <RenderComments comments = {props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id}/>;
                    
                </div>    
                
                </div>
                
            </div>
        );
        else{
            return(
                <div></div>
            );
        }
    }
export default DishDetail;