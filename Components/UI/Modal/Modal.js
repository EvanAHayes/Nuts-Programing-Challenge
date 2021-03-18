import React, {Component}from 'react';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';

import React, { Component } from 'react'

class Modal extends Component {
    houldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
 }

 render(){
     return(
         <Aux>
         <Backdrop  show={this.props.show} clicked={this.props.modalClosed}/>
     <div className={classes.Modal}
     style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
     opacity: this.props.show ? '1' : '0'}}> 
         {this.props.children}
     </div>
     </Aux>
     );
 }
}

export default Modal
