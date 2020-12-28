// Taleh Muzaffarov

import React, { Component } from 'react'
import '../../index.css';
import { PageHeader, Typography } from 'antd';
import { List } from 'antd-mobile';
import { fetchQuizList, fetchUserScore } from '../../actions/testAction'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import {
    QuestionAnswer
} from '@material-ui/icons';
import { connect } from 'react-redux';

const { Title } = Typography;
const Item = List.Item;
const Brief = Item.Brief;
class GmfMain extends Component {
    componentDidMount() {
        this.props.fetchUserScore()
        this.props.fetchQuizList()
    }
    handleArticle = (val) => {
        this.setState({ article: val._id })
        this.props.history.push("/article/" + val.url)
    }
    render() {
        const { quiz_articles, user_score } = this.props

        return (
            <div id="gmf_main" style={{ marginTop: 64, backgroundColor: 'white' }}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title={<span style={{ color: "#990099" }}>Quizes</span>}
                    subTitle={<Title level={4} className="gmf-score" >Your score: <span className="score">{user_score}P</span></Title>}
                />
                <List className="my-list">
                    <div>
                        {quiz_articles.map((val, index) => (
                            <Item style={{ width: '100%', float: 'left' }} align="top" multipleLine >
                                <QuestionAnswer style={{ float: "left", color: "#990099" }} />
                                <div style={{ width: '70%', float: 'left', paddingLeft: 10 }} >
                                    <span style={{ fontSize: 12, fontWeight: 'bold', color: "#990099", width: '100%' }} onClick={() => this.handleArticle(val)}>{val.title}</span>
                                    <span style={{ position: "absolute", right: 15, fontSize: 14, fontWeight: "bold", color: "#00284d", }}>33P</span>
                                    <Brief >Technology * 3 question</Brief>
                                </div>
                            </Item>
                        ))}

                    </div>

                </List>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userCategories: state.test.userCategories,
    quiz_articles: state.test.quiz_articles,
    user_score: state.test.user_score
});

export default withRouter(connect(mapStateToProps, { fetchQuizList, fetchUserScore })(GmfMain));

