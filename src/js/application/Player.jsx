import React from 'react';
import FastClick from './Utilities/FastClick';
import { STRINGS } from './Utilities/Constants';
import PlayPauseButton from './Components/PlayPauseButton';
import ProgressBar from './Components/ProgressBar';
import TimeCode from './Components/TimeCode';
import VolumeControls from './Components/VolumeControls';

class Player extends React.Component {
	
	/**
	* initAudio() initializes a new Audio object and returns data when ready
	*
	* @return {Promise} resolve on data load, reject on error
	*/
	initAudio(url) {
		
		return new Promise( ( resolve, reject ) => {
			console.time("<AudioLoad>");
			
			// assign new audio instance to self
			this.audio = new Audio( this.props.playbackUrl );
			
			// The promise will resolve upon final extraction of data.
			this.audio.addEventListener( 'loadeddata', event => {
				console.timeEnd("<AudioLoad>");
				
				// Also bubble up information about file duration.
				this.setState({
					duration : event.target.duration
				});
				resolve( event.target );
			});
			
			// Play through immediately when able to.
			this.audio.addEventListener( 'canplaythrough', event => {
				this.setState({
					isReady: true
				});
				this.play() 
			});
			
			// Sync current time to internal state
			this.audio.addEventListener( 'timeupdate', event => {
				this.setState({
					currentTime : event.target.currentTime
				})
			});
			
			// ... or fail miserably if there was an error loading the file.
			this.audio.addEventListener( 'error', event => reject( event.target.error ) )
			
			// Dispatch progress events to root data.
			this.audio.addEventListener( 'progress', event => {
				this.setState({
					progress: event.target.buffered
				});
			});
			
		});
	}
	
	play() {
		this.audio.play();
		this.setState({
			isPlaying : true
		});
	}
	
	pause() {
		this.audio.pause();
		this.setState({
			isPlaying : false
		});
	}
	
	goToIndexInSeconds(seconds) {
		this.audio.currentTime = seconds;
	}
	
	/**
	*  handleButtonToggle() is a callback for when a play/pause button is pressed.
	*/
	
	handleButtonToggle() {
		if ( !this.state.isPlaying ) {
			// If the audio object has not yet been initialized,
			// load it on up.
			if ( !this.audio ) {
				this.initAudio()
					// .then( () => this.play() )
					.catch( error => console.error( STRINGS.ERROR_CODES[ error.code ] ) );
			} else {
				// If it has been, simply toggle to play.
				this.play()
			}
		} else {
			// If the current state is playing, switch over to paused.
			this.pause();
		}
	}
	
	/**
	*  setPlayheadFromPercentage() takes a given percentage (usually calculated 
	*  already from pixels), converts it into seconds, and then sets the current 
	*  time to that result.
	*  
	*  @param {Number} percent
	*/
	setPlayheadFromPercentage(percent) {
		console.info('setting percentage:', percent);
		let targetSeconds = this.state.duration * ( percent / 100 );
		// console.info('target seconds:', targetSeconds, "duration", this.state.duration );
		this.goToIndexInSeconds(targetSeconds);
	}
	
	/**
	*  setVolume() takes a given 0-1 decimal and applies it to the player volume.
	*  
	*  @param {Number} decimal
	*/
	setVolume(decimal) {
		this.audio.volume = decimal;
		this.setState({
			currentVolume : decimal
		});
	}
	
	constructor(props) {
		super(props);	
		this.state = {
			isPlaying : false,
			isLoading: false,
			isReady : false,
			progress : [],
			currentTime : 0,
			currentVolume : 1,
			duration : 0
		}
		FastClick(document.body);
	}
	
	render() {
		let styleState = '';
		if (this.state.isPlaying) {
			styleState += ' is-playing';
		}
		if (this.state.isLoading) {
			styleState += ' is-loading';
		}
		
		if (this.state.isReady) {
			styleState += ' is-ready';
		}
		return (
			<div className={`player ${styleState}`}>
				<PlayPauseButton isPlaying={this.state.isPlaying} onButtonToggle={this.handleButtonToggle.bind(this)}/>
				
				{ this.audio ? (<ProgressBar progress={this.state.progress} duration={this.state.duration} currentTime={this.state.currentTime} userRequestedNewPlayheadIndex={this.setPlayheadFromPercentage.bind(this)} />) : null }
				{ this.audio ? (<TimeCode currentTime={this.state.currentTime} duration={this.state.duration} />) : null }
				{ this.audio ? ( <VolumeControls volumeChanged={this.setVolume.bind(this)} /> ) : null }
			</div>
		);
	}
}

export default Player;