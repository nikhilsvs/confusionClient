import React from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';
import {Link } from 'react-router-dom';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap';
 
   
    
    function RenderComments({comments}){
        
        if(comments!=null)
        {
            const months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            const ans = comments.map((x)=>{
                var d = new Date(x.date)
                return(
                    <ul className="list-unstyled">
                        <li className="m-1">{x.comment}</li>
                        <li className="m-1">--{x.author} , {months[d.getMonth()]} {d.getDate()} , {d.getFullYear()}</li>
                    </ul>
                );
            });
            return ans;
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
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
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
        console.log("DishDetail Component render is Invoked")
        if(props.dish!=null)
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
                    <RenderComments dish = {props.comments}/>;
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