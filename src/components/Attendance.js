import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navigation from './NavigationBar';

import $ from 'jquery';
window.$ = $;


const styles = theme =>({
    
});

class Attendence extends React.Component {

    
    
    handleValueChange(e) {

    }
    
    stateRefresh(){
    }

    componentDidMount(){

    }

    componentWillUnmount() {

    }
    
    callApi = async () => {

    }

    progress = () => {
        
    };

    render() {
        
        return (
            <div>
              <Navigation current_link="/attendence"/>
            
            </div>
        
        )

    }
}
    
      

export default withStyles(styles)(Attendence);