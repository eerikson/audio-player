import React from 'react';

class PlayPauseButton extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	buttonWasClicked() {
		this.props.onButtonToggle();
	}
	
	render() {
		let styleState = this.props.isPlaying ? 'is-playing' : 'is-paused';
		
		return(
			<figure className={`play-pause-button component ${styleState}`} onClick={this.buttonWasClicked.bind(this)}>
				<div className="left" />
				<div className="right" />
				<div className="triangle first" />
				<div className="triangle second" />
			</figure>
		);
	}
	
}

export default PlayPauseButton;