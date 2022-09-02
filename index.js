import React, { Component } from 'react';

// Constants.
import * as TransitionConstants from './constants/Transitions';

import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import ReactTransitions from 'react-transitions';


const styles = {
	componentContainer:{
		display: 'flex'
	}
}

export default class NavigationStack extends Component {

	constructor(props) {
		super(props);

		// Unwrap props.
		const {
			children
		} = props;

		const componentsArray = [];

		// We received array of components as children, but before rendering them, 
		// we should add additional props to each of them,
		// such as key and stackController:
		children.forEach((component)=>{
			console.log(component);

			componentsArray.push(
				this._addNewPropsToComponent(component)
			)
		});

		this.state = {
			components: componentsArray,
			currentTransitionName: TransitionConstants.IN
		}
	}

	// #section-begin Stack control methods
	/**
	 * Saves new component to stack.
	 * @param {Object} component - Component to add to stack.
	 * @param {String} transition - Transiion animation name.
	 */
	_pushComponent(component, transition) {
		const components = [ ...this.state.components ];

		const changedComponent = this._addNewPropsToComponent(component);
		components.push(changedComponent);

		const currentTransitionName = transition;
		this.setState({
			components,
			currentTransitionName
		});
	}

	/**
	 * Removes the top most component from stack.
	 * @param {String} transition - Transiion animation name.
	 */
	_popLastComponent(transition) {
		const components = [ ...this.state.components ];
		components.pop();
		
		const currentTransitionName = transition;
		this.setState({
			components,
			currentTransitionName
		});
	}
	// #section-end Stack control methods

	// #section-begin Public methods
	/**
	 * Saves new component to stack with default transition in animation.
	 */
	pushComponent(component) {
		this._pushComponent(component, TransitionConstants.IN);
	}

	/**
	 * Removes the top most component from with default transition out animation.
	 */
	popLastComponent() {
		this._popLastComponent(TransitionConstants.OUT);
	}

	/**
	 * Saves new component to stack with modal transition in animation.
	 */
	pushModal(component) {
		this._pushComponent(component, TransitionConstants.MODAL_IN);
	}

	/**
	 * Removes the top most component from with modal transition out animation.
	 */
	popModal() {
		this._popLastComponent(TransitionConstants.MODAL_OUT);
	}
	// #section-end Public methods

	/**
	 * Returns the same component with new props, such as
	 * unique key
	 * navigationStackController object
	 *
	 * @param {Object} component - Component to modify
	 * @returns {Object} Modified component
	 */
	_addNewPropsToComponent(component) {
		const stackRef = this;

		const newComponent =  React.cloneElement(
			component,
			{
				key: nanoid(),
				navigationStackController: this._createNavigationStackController(stackRef)
			}
		);
		return newComponent;
	}

	/**
	 * Returns NavigationStackController object. 
	 * It is remote for components in the stack to control stack.
	 *
	 * @param {Object} stackRef - Reference to the stack (This class).
	 * @returns {Object} controller
	 */
	_createNavigationStackController(stackRef) {
		const controller = {
			push: function(component) {
				stackRef.pushComponent(component);
			},
			pop: function() {
				stackRef.popLastComponent();
			},
			pushModal: function(component) {
				stackRef.pushModal(component);
			},
			popModal: function() {
				stackRef.popModal();
			},
		}
		return controller;
	}

	render() {
		const {
			activeComponent,
			currentTransitionName,

			screenWidth,
			screenHeight
		} = this.state;

		const {
			componentWidth,
			componentHeight
		} = this.props;

		return (
			<ReactTransitions
				transition={ currentTransitionName }
				width={ componentWidth ?? screenWidth }
				height={ componentHeight ?? screenHeight }
				style={ styles.componentContainer }
			>
				{ activeComponent }
			</ReactTransitions>
		);
	}
}

NavigationStack.propTypes = {
	// componentWidth: PropTypes.number.isRequired,
	// componentHeight: PropTypes.number.isRequired
};
