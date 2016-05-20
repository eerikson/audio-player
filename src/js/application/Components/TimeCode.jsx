import React from 'react';
import moment from 'moment';

class TimeCode extends React.Component {
	
	getSecondsAndMinutes(seconds) {
		const input = `${Math.floor(seconds)}`;
		const output = moment(input, 'X').format("m:ss");
		return output; 
	}
	
	componentDidMount() {
		this.state.isMounted = true;
	}
	
	constructor(props) {
		super(props);
		this.state = {
			isMounted : false
		}
	}
	
	render() {
		const styleState = this.state.isMounted ? 'is-mounted' : null;
		
		return (
			<time className={`timecode component ${styleState}`}>
				<span className="current time">{this.getSecondsAndMinutes(this.props.currentTime)}</span>
				 <span className="divider"> / </span> 
				<span className="total time">{this.getSecondsAndMinutes(this.props.duration)}</span>
			</time>
		);
	}
}

export default TimeCode;