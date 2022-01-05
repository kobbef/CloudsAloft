//Components exported? Use capital letter for beginning file name
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component{
componentDidMount(){
    this.props.fetchUser();
}

    render(){
    return <div style={{backgroundColor:'rgb(247 253 255)', position:'absolute', height:'100%', left:'0px', right:'0px', top:'0px', bottom:'0px'}}>
                <div> 
                <BrowserRouter>
                    <div>
                        < Header />   
                        <Route exact={true} path="/" component= {Landing} />
                        <div className='container'>
                            {/* <Route exact={true} path="/" component= {Landing} /> */}
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                        </div>
                    </div>
                </BrowserRouter> 
                </div>
            </div>
    }   
}

export default connect(null, actions)(App);