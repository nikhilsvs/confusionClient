import React from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';

 
   
    
    function RenderComments({dish}){
        
        if(dish!=null)
        {
            const months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            const ans = dish.comments.map((x)=>{
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
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish = {props.dish}/>
                </div>  
                <div className="col-12 col-md-5">
                    <h4>Comments</h4>
                    <RenderComments dish = {props.dish}/>;
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