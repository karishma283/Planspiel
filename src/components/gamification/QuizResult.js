//Taleh Muzaffarov
import React, { Component } from 'react'
import { Card, Typography, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
const { Text } = Typography;

class QuizResult extends Component {
    render() {
        let { quizResult } = this.props
        let score = 0
        if (quizResult != null) {
            quizResult.forEach(result => {
                score = score + result.score
            });
            return (
                <div style={{ marginTop: 64, marginBottom: 50 }}>

                    <Card title={<div style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap', textAlign: "center" }}>Result</div>} bordered={false}>
                        <Text strong style={{ marginLeft: 10 }}>
                            {quizResult.map((result, key) => (
                                <div>
                                    <p style={{ textAlign: "center", fontSize: 12, color: 'black' }}>Question: {key}.{result.score}</p>
                                    <p style={{ textAlign: "center", fontSize: 12, color: 'black' }}>Your Answer: {result.userAnswer}</p>
                                    <p style={{ textAlign: "center", fontSize: 12, color: 'black' }}>Correct Answer: {result.correctAnswer}</p>
                                    <p style={{ textAlign: "center", fontSize: 12, color: 'black' }}>Score: {result.score}</p>
                                </div>))}
                        </Text>
                        <Text>
                            <p style={{ textAlign: "center", fontSize: 30, color: 'green' }}>Overall Score: {score}</p>
                        </Text>
                    </Card></div>
            )
        }
        else {
            return (<div style={{ marginTop: 64, marginBottom: 50 }}><p>Loading</p></div>)
        }
    }
}

const mapStateToProps = state => ({
    quizResult: state.test.quizResult
});
export default withRouter(connect(mapStateToProps, {})(QuizResult));
