import React from 'react';

class ProgressBar extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isMounted : false
		}
	}
	
	componentWasClicked(event) {
		let boundingBox = this.refs.root.getBoundingClientRect();
		// Convert pixel coordinates into percentage.
		let targetPlayheadPercentage =  ( event.clientX - boundingBox.left ) / boundingBox.width * 100;
		
		// And then we need to convert BACK into seconds. We should do that in the parent object.
		this.props.userRequestedNewPlayheadIndex(targetPlayheadPercentage);
	}
	
	componentDidMount() {
		this.state.isMounted = true;
	}
	
	render() {
		// Iterate through collection of timeranges.
		// Timeranges are essentially what sections of the track are currently 
		// buffered. 
		let buffered = this.props.progress;
		let bufferedCount = buffered.length;
		let bufferTracks = [];
		let styleState = this.state.isMounted ? 'is-mounted' : null;
		
		// Playhead stuff.
		let playheadStyle = {
			left : `${this.props.currentTime / this.props.duration * 100}%`
		};
		
		for (let i = 0; i < bufferedCount; i++) {
			let start = buffered.start(i);
			let end = buffered.end(i);
			let startPercentage = start / this.props.duration * 100;
			let endPercentage = end / this.props.duration * 100;
			let style = {
				left: `${startPercentage}%`,
				width: `${endPercentage - startPercentage}%`
			};
			
			bufferTracks.push( <div key={i} className="track buffer" style={style} /> );
		}
		
		
		return (
			<div className={`progress-bar component ${styleState}`} onClick={this.componentWasClicked.bind(this) } ref="root">
				<div className="track full" />
				{bufferTracks}
				<div className="playhead" style={playheadStyle} />
			</div>
		);
	}
}


export default ProgressBar;