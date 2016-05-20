import React from 'react';
import { DEFAULTS } from '../Utilities/Constants';

class VolumeControl extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isMounted : false
		}
	}
	
	componentDidMount() {
		this.state.isMounted = true;
	}
	
	volumeIncrementWasClicked(event) {
		let parentEl = event.target.parentNode;
		const index = [].indexOf.call( parentEl.children, event.target );
		const targetVolume = (index / ( DEFAULTS.VOLUME_INCREMENTS - 1 ) );
		this.props.volumeChanged(targetVolume);
		
		[].forEach.call( parentEl.children, (sibling) => {
			sibling.classList.remove( 'is-current-volume' );
		});
		
		// Now, we update our DOM
		event.target.classList.add( 'is-current-volume' );
	}
	
	render() {
		
		let styleState = this.state.isMounted ? 'is-mounted' : null;
		let increments = [];
		
		for ( let i = 0; i < DEFAULTS.VOLUME_INCREMENTS; i++ ) {
			increments.push( <li key={i} className="increment" onClick={this.volumeIncrementWasClicked.bind(this)}/>);
		}
		
		return (
			<ul className={`volume-controls component ${styleState}`}>
				{increments}
			</ul>
		);
	}
}

export default VolumeControl;