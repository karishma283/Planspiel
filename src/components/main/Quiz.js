//Taleh Muzaffarov 

import React, { Component } from 'react'
import { Card, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Input } from 'antd';
import { finishQuiz } from '../../actions/testAction'
const { Title } = Typography;
const { Text } = Typography;
class Quiz extends Component {
    state = {
        value: 1,
        size: 'small',
        quizIndex: 0,
        answers: []

    };
    finishQuiz = () => {
        this.props.finishQuiz(this.state.answers)
        this.props.history.push('/quiz-result')
    }
    onChange = (id, type_id, type, e) => {
        console.log(id, type_id, type, e.target.value);

        const { quizIndex } = this.state
        this.state.answers[quizIndex] = { quiz_id: id, type_id: type_id, type: type, answer: e.target.value }
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { size, quizIndex } = this.state;
        const { quizes } = this.props
        const number_of_quizes = quizes.length
        console.log(this.state.answers);

        let nextBtn = null
        if (number_of_quizes > 0) {
            if (number_of_quizes > 1) {
                nextBtn =
                    <Button type="primary" shape="round" size={size}>
                        Next
                    </Button>
            }
            return (
                <div style={{ marginTop: 40, height: "100%" }} className="bgColor">
                    <Card title={<div style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}><LeftOutlined style={{ paddingRight: 16, }} onClick={() => this.props.history.goBack()} /><p>Quiz</p></div>} bordered={false}>
                    </Card>
                    <Card title="Question 1" bordered={false} style={{ width: "90%", margin: "5%", height: "65%" }}>
                        <Text strong style={{ marginLeft: 10 }}>
                            {quizes[quizIndex].text} <br /> <span style={{ width: "100%", color: "red" }}>Fill in the blanks.</span></Text>
                        <div style={{ marginTop: 10 }}>
                            {quizes[quizIndex].items.choices ? <Radio.Group onChange={(e) => this.onChange(quizes[quizIndex]._id, quizes[quizIndex].items._id, 'mc', e)} value={this.state.value} style={{ marginLeft: 10, padding: 10 }}>
                                {
                                    quizes[quizIndex].items.choices.map((val, k) => (
                                        <Radio value={val} key={k} style={{ width: "100%", lineHeight: "30px" }}>{val.charAt(0).toUpperCase() + val.slice(1)}</Radio>
                                    ))
                                }

                            </Radio.Group>
                                :
                                <Input style={{ marginTop: 10, marginLeft: 10, width: "95%" }} placeholder="Type your answer" onChange={(e) => this.onChange(quizes[quizIndex]._id, quizes[quizIndex].items._id, 'fg', e)} />}
                        </div>

                        <div>

                            <Button type="primary" danger shape="round" size={size} onClick={() => this.finishQuiz()}>
                                Finish
                    </Button>
                            {nextBtn}
                        </div>
                    </Card>
                    {/*                 <Title level={4} style={{ fontSize: 23, textAlign: "center" }}>Question 1</Title>
 */}
                </div >
            )
        }
        else {
            return <p>Loading</p>
        }
    }
}
const mapStateToProps = state => ({
    quizes: state.test.quizes
});
export default withRouter(connect(mapStateToProps, { finishQuiz })(Quiz));

