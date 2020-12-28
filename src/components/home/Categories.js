//Taleh Muzaffarov and Shruti Chauhan

import React, { Component } from 'react'
import { } from 'antd';
import { Carousel, WingBlank, Grid, Card, WhiteSpace } from 'antd-mobile';
import PopoverActions from '../shared/PopoverActions'
import { connect } from 'react-redux';
import { nonsense } from 'antd-mobile/lib/picker';
import { Row, Col, Divider } from 'antd';
import { SportsKabaddi, Casino, Language, Brightness4, Traffic, Gavel, MonetizationOn, LocalFlorist, Fingerprint, Favorite } from "@material-ui/icons";
import { fetchUserCategories, fetchNews } from '../../actions/testAction'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

const { Meta } = Card;

class Categories extends Component {
    componentDidMount() {

    }
    fetchCategoryNews = (id) => {
        this.props.fetchNews(id)
        this.props.history.push('/category-news')
        // this.props.fetchCategoryNews(id)
    }
    render() {
        const { userCategories } = this.props
        function CategoryIcon(category) {
            const style = { fontSize: 50, margin: "20px 0" }

            switch (category) {
                case "Sport":
                    return <SportsKabaddi style={style} />
                case "Entertainment":
                    return <Casino style={style} />
                case "Politics":
                    return <Gavel style={style} />
                case "Technology":
                    return <Fingerprint style={style} />
                case "World":
                    return <Language style={style} />
                case "Nature":
                    return <LocalFlorist style={style} />
                case "Health":
                    return <Favorite style={style} />
                case "Business":
                    return <MonetizationOn style={style} />
                case "Weather":
                    return <Brightness4 style={style} />
                case "Traffic":
                    return <Traffic style={style} />
                default:
                    return <SportsKabaddi style={style} />
            }
        }
        if (userCategories === null) {
            return <p>Loading</p>

        }
        else {
            return (<div id="category-grid">
                {userCategories.map((category, index) => (
                    <div style={{}} className="category-item" onClick={() => this.fetchCategoryNews(category._id)}>
                        <Card>
                            <Card.Body style={{ padding: "15px 0px 6px", width: "100%", textAlign: "center" }}>
                                {CategoryIcon(category.name)}
                                <div style={{ textAlign: "center" }}>{category.name}</div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}





            </div>
            )

        }



    }
}

const mapStateToProps = state => ({
    news: state.test.news,
    userCategories: state.test.userCategories
});

export default withRouter(connect(mapStateToProps, { fetchUserCategories, fetchNews })(Categories))
