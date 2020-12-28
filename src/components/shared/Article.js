//Taleh Muzaffarov 

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchArticle, fetchQuiz } from '../../actions/testAction'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import ArticleActions from './ArticleActions'
import { LeftOutlined, } from '@ant-design/icons'
import { log } from 'util';
import { PlayCircleFilled, Stop, MoreVert, Pause } from '@material-ui/icons';
import { Card, Typography, Button, Icon } from 'antd';
import { Row, Col, Divider } from 'antd';
//import Speech from 'react-speech';
import Speech from "speak-tts";

const { Paragraph } = Typography;

class Article extends Component {
    constructor(props) {
        super()

        this.state = {
            speaker: false
        }
    }
    componentDidMount() {
        const url = decodeURI(window.location.href.split("article/")[1])
        this.props.fetchArticle(url)
    }
    startQuiz = (id) => {
        this.props.fetchQuiz(id)
        this.props.history.push('/quiz')
    }
    startPlay = (speech, content) => {
        speech.resume()
        speech.speak({
            text: content,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
        this.setState({ speaker: true })
    }
    pausePlay = (speech) => {
        speech.pause()
        this.setState({ speaker: false })
    }
    stopPlaying = (speech) => {
        speech.cancel()
        this.setState({ speaker: false })
    }
    render() {
        const { article } = this.props
        const { speaker } = this.state
        const speech = new Speech();
        var btn = null
        speech.init({
            'volume': 1,
            'lang': 'en-GB',
            'rate': 1,
            'pitch': 1,
            'voice': 'Google UK English Male',
            'splitSentences': true,
            'listeners': {
                'onvoiceschanged': (voices) => {
                    console.log("Event voiceschanged", voices)
                }
            }
        })
        if (speaker) {
            btn = <Pause style={{ fontSize: 40 }} onClick={() => this.pausePlay(speech)} />
        }
        else {
            btn = <PlayCircleFilled style={{ fontSize: 40 }} onClick={() => this.startPlay(speech, article.content)} />
        }


        return (
            <div style={{ marginTop: 40, marginBottom: 50 }}>

                <Card className="articleCard" title={<div style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}><LeftOutlined style={{ paddingRight: 16, }} onClick={() => this.props.history.goBack()} />{article.title}</div>} bordered={false}>
                    <img style={{ width: '100%' }} src={article.img} />

                    <Paragraph style={{ marginBottom: 100 }}>


                        {article.content}
                        <div style={{ width: "100%" }}><Button type="primary" onClick={() => this.startQuiz(article._id)}>Quiz</Button></div>
                    </Paragraph>

                    <Card className="articleSpeech" style={{
                        position: "fixed",
                        width: "100vw",
                        bottom: 50,
                        marginLeft: "-15px",
                        padding: 0
                    }} >
                        <Row type="flex" align="middle" style={{ width: "100%" }}>
                            <Col style={{ width: "100%", justifyContent: 'center', alignItems: 'center', display: 'inline-flex', }}>
                                {btn}
                                <Stop style={{ fontSize: 30, marginLeft: 20 }} onClick={() => this.stopPlaying(speech)} />
                                <ArticleActions />
                            </Col>
                        </Row>

                    </Card>
                </Card>
            </div >
        )
    }
}
const mapStateToProps = state => ({
    article: state.test.article
});
export default withRouter(connect(mapStateToProps, { fetchArticle, fetchQuiz })(Article));
