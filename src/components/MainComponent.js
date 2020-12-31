import React,{Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch,Route,withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {postComment,fetchDishes,fetchComments,fetchPromos,postFeedback,fetchLeaders} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      leaders : state.leaders,
      promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment:(dishId,rating,author,comment) =>dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{ dispatch(actions.reset('feedback'))},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())},
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  fetchLeaders :()=>{dispatch(fetchLeaders())}

});
class Main extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render() {

    const HomePage = () =>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
              leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
        />
      );
    }
    const Contactcompo = () =>{
      return(
        <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback} /> 
      );
    }
    const DishWithId = ({match})=>{
        return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))} 
            errMess={this.props.comments.errMess}
            postComment={this.props.postComment} 
          />
        );
    }
    return (
      <div>
        <Header />  
        <TransitionGroup>     
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> 
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>} />
              <Route path="/menu/:dishId" component={DishWithId}/>
              <Route exact path="/contactus" component={Contactcompo}/>
              <Route path="/aboutus" component={()=><About leaders = {this.props.leaders}/>}/>
              <Redirect to="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }

}

 

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(Main)));
