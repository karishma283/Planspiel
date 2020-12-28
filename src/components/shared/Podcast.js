//Taleh Muzaffarov and Rajat Ghosh

import React, { Component } from 'react'
import { Typography } from 'antd';
import { Card } from 'antd';
import { WhiteSpace } from 'antd-mobile';

const { Title } = Typography;
class Podcast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: false
        };
    }
    componentDidMount() {
        /* var player = document.getElementsByClassName('player')[0];
        document.addEventListener('keydown', this.handleKeyPress); */
        /**
          * Have to add media event listeners here.
          *
        */
        /*  console.log(player);
 
         player.on('play', (e) => {
             e.preventDefault();
             this.playLocation();
         });
 
         player.on('pause', (e) => {
             e.preventDefault();
             this.pause();
         });
 
         player.on('ended', (e) => {
             e.preventDefault();
             this.ended();
         }); */
        /* $(document).on('keydown', (e) => {
        }); */
        /*  player.on('wheel', (e) => {
             e.preventDefault();
             e.stopPropagation();
             if (e.originalEvent.wheelDelta > 0) {
                 this.state.player.currentTime += 1;
             } else {
                 this.state.player.currentTime -= 1;
             }
         }); */
    }
    handleKeyPress(e) {
        /*  // Move currentTime forward and backward via arrow keys and play/pause via spacebar.
         if (e.keyCode == 39) {
             this.state.player.currentTime += 1;
         } else if (e.keyCode == 37) {
             this.state.player.currentTime -= 1;
         } else if (e.keyCode == 32 && this.state.player.paused == true) {
             e.preventDefault();
             this.state.player.play();
         } else if (e.keyCode == 32 && this.state.player.paused == false) {
             e.preventDefault();
             this.state.player.pause()
         }
  */
    }
    componentWillUnmount() {
        /*  var player = document.querySelectorAll("#" + this.props.id)[0]
         //var player = $('#' + this.props.id);
         player.off('play');
         player.off('pause');
         document.removeEventListener('keydown', this.handleKeyPress);

         player.off('wheel') */
    }

    getPlaybackTime = (time) => {
        /* var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time / 60);
        if (minutes > 59) {
            minutes = Math.floor(time / 60) - 60;
        }
        var seconds = Math.round(time - minutes * 60);
        if (seconds > 3599) {
            seconds = Math.round(time - minutes * 60) - 3600;
        }
        return time; */
    }

    playLocation = () => {
        /* this.setState({ player: document.getElementsByClassName('player')[0] }, function () {
            var playbackTime = this.getPlaybackTime(this.state.player.currentTime);
            var playbackTime = localStorage.getItem('codepenReactPlayer');
            if (playbackTime !== null) {
                this.setState({
                    player: { currentTime: playbackTime }
                })
                this.state.player.currentTime = playbackTime;
            }
            this.state.player.play();
        }) */
    }
    pause = () => {
        /*  var playbackTime = this.getPlaybackTime(this.state.player.currentTime);
         localStorage.setItem('codepenReactPlayer', playbackTime); */
    }

    ended = () => {
        // Set playback_time to 0.
        /*  var playbackTime = 0
         localStorage.setItem('codepenReactPlayer', playbackTime); */
    }
    render() {

        return <div class="row">
            <div class="columns large-6 text-center panel">
                <div id="audio_div" style={{ width: '100%' }}>
                    <div style={{ background: '#ECECEC', padding: '10px' }}>
                        <Card title={<p style={{ fontWeight: 'bold' }}>Der Sportunterricht reicht nicht</p>} bordered={false} style={{ width: '100%' }}>
                            <audio controls className="player" preload="false" style={{ width: '100%', height: '40px' }}>
                                <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                            </audio>
                        </Card>
                        <WhiteSpace size="xs" />

                        <Card title={<p style={{ fontWeight: 'bold' }}> Stollberg bekommt einen Mobilitätsmanager</p>} bordered={false} style={{ width: '100%' }}>
                            <audio controls className="player" preload="false" style={{ width: '100%', height: '40px' }}>
                                <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                            </audio>
                        </Card>
                        <WhiteSpace size="xs" />

                        <Card title={<p style={{ fontWeight: 'bold' }}>Wo es in Westsachsen am häufigsten schüttet</p>} bordered={false} style={{ width: '100%' }}>
                            <audio controls className="player" preload="false" style={{ width: '100%', height: '40px' }}>
                                <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                            </audio>
                        </Card>
                        <WhiteSpace size="xs" />

                        <Card title={<p style={{ fontWeight: 'bold' }}>Anwalt Abela wird neuer Premier in Malta</p>} bordered={false} style={{ width: '100%' }}>
                            <audio controls className="player" preload="false" style={{ width: '100%', height: '40px' }}>
                                <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                            </audio>
                        </Card>
                        <WhiteSpace size="xs" />
                    </div>
                    {/* <Title level={4}>h3. Ant Design</Title>


                    <audio controls className="player" preload="false" style={{ width: '100%' }}>
                        <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                    </audio> */}
                </div>
                <br /><br />
            </div>
        </div>

    }
}

export default Podcast