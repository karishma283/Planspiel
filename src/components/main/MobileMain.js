//Taleh Muzaffarov 

import React, { Component } from 'react'
import { ButtonMobile } from 'antd-mobile';
import { Layout, Menu, Breadcrumb, Icon, Typography, Button } from 'antd';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchUserCategories } from '../../actions/testAction'
import '../../index.css';
import Publishers from './Publishers'
import Quiz from './Quiz'
import {
    LibraryBooks, QuestionAnswer, Settings as SettingIcon, Headset
} from '@material-ui/icons';

import { HomeOutlined, AppstoreOutlined, NotificationOutlined } from '@ant-design/icons'
import { LoginOutlined } from '@ant-design/icons'
import ContentList from './../ContentList'
import { Desktop, Mobile, Tablet } from './../Responsive'
import { Card, WhiteSpace, List, Grid } from 'antd-mobile';
import PrivateRoute from '../shared/PrivateRoute'
import UserProfile from '../profile/UserProfile'
import Settings from '../settings/Settings'
import AllNews from '../home/AllNews'
import AllChannels from '../home/AllChannels'
import GmfMain from '../gamification/GmfMain'
import Article from '../shared/Article'
import lscache from 'lscache'
import Home from '../home/Home'
import Login from '../shared/Login'
import Register from '../shared/Register'
import QuizResult from '../gamification/QuizResult'
import Downloads from '../downloads/Downloads'
import { log } from 'util';
import MobileHome from '../home/MobileHomeNews'
import Podcast from '../shared/Podcast';
import AddCategory from '../shared/AddCategory'
import CategoryNews from '../home/CategoryNews';
const Item = List.Item;
const Brief = Item.Brief;
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

function NoMatch() {
    return <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
        <Typography variant="h3" style={{ color: 'green' }} component="h5">404 Nicht gefunden</Typography>
    </Grid>
}

class MobileMain extends Component {
    constructor(props) {
        super()
        this.state = {
            mode: 'podcast',
            visible: 'true'
        }
    }
    componentDidMount() {
        if (lscache.get('usertoken')) {
            this.props.fetchUserCategories()
        }
    }
    menuClick = (el) => {
        switch (el.text) {
            case "Settings":
                this.props.history.push('/settings')
                break;
            case "Home":
                this.props.history.push('/')
                break;
            case "Quiz":
                this.props.history.push('/gmf')
                break;
            case "Downloads":
                this.props.history.push("/downloads")
                break;
            case "Profile":
                this.props.history.push("/account")
                break;
            default:
                break
        }
    }
    handleSettings = () => {
        this.props.history.push("/settings")
    }

    redirect = (to) => {
        console.log(to);

        this.props.history.push("/register")
        this.setState({ redirect: to })
    }
    ModePodcast = () => {
        lscache.set('mode', 'podcast', 300)
        this.setState({
            mode: 'podcast'
        })
    }
    ModeNews = () => {
        lscache.get('mode')
        lscache.set('mode', 'news', 300)
        this.setState({ mode: lscache.get('mode') })

    }
    setVisible = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        if (!lscache.get('usertoken')) {
            return <div>
                <Switch style={{ marginTop: 20 }}>
                    <Route path="/register" component={() => <Register />} />
                    <Route path="/forgot/" component={() => { }} />
                    <Route path="/(login|/|)" component={() => <Login redirect={(to) => this.redirect(to)} />} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        } else {
            const { userCategories } = this.props

            const footerMenu = [
                {
                    icon: <HomeOutlined />,
                    text: "Home",
                },

                {
                    icon: <QuestionAnswer />,
                    text: "Quiz",
                },
                {
                    icon: <AppstoreOutlined />,
                    text: "Downloads",
                },
                {
                    icon: <NotificationOutlined />,
                    text: "Notifications",
                }
            ]
            const data = footerMenu.map((_val, i) => ({
                icon: _val.icon,
                text: _val.text,
            }));

            return (
                <Layout style={{ width: '100vw', height: '100vh', backgroundColor: "white" }} >
                    <LoginOutlined theme="filled" style={{ float: 'right', color: 'red' }} />
                    <AddCategory visible={this.state.visible} mode={"initial"} setVisible={() => this.setVisible()} />
                    <Header className="header">
                        <div style={{ width: '25%', float: 'left', margin: '10px 0' }}>
                            {this.state.mode === 'podcast'
                                ? <Headset style={{ color: '#40a9ff' }} onClick={() => this.ModeNews()} />
                                : <LibraryBooks style={{ color: '#40a9ff' }} onClick={() => this.ModePodcast()} />
                            }
                        </div>
                        {/* <div className="logo">
                            <img style={{ width: '50px' }} src="https://www.fiveberg.de/assets/images/logo_skyblue.png" />
                        </div> */}
                        {/* <div className="appName">Fiveberg</div>*/}
                        <SettingIcon className="headerSettings" onClick={this.handleSettings} />
                    </Header>
                    <Switch style={{ marginTop: 40, height: '100%' }} >
                        <Route exact path="/discover" component={() => <Home tab={"0"} categories={userCategories} mode={this.state.mode} />} />
                        <Route exact path="/(trending|)" component={() => <Home tab={"1"} categories={userCategories} mode={this.state.mode} />} />
                        <Route exact path="/(recent-news|recent-podcasts)" component={() => <Home tab={"2"} categories={userCategories} mode={this.state.mode} />} />
                        <Route path="/article/" component={() => <Article />} />
                        <Route exact path="/account" component={() => <UserProfile />} />
                        <Route exact path="/updateCategories" component={() => <AddCategory visible={true} />} />
                        <Route exact path="/quiz" component={() => <Quiz />} />
                        <Route exact path="/quiz-result" component={() => <QuizResult />} />
                        <Route exact path="/allnews" component={() => <AllNews />} />
                        <Route exact path="/category-news" component={() => <CategoryNews />} />

                        <Route exact path="/downloads" component={() => <Downloads />} />
                        <Route exact path="/allchannels" component={() => <AllChannels />} />
                        <Route exact path="/publishers" component={() => <Publishers />} />
                        <Route exact path="/settings" component={() => <Settings />} />
                        <Route exact path="/gmf" component={() => <GmfMain />} />
                        <Route component={NoMatch} />
                    </Switch>
                    <Footer className="mobileFooter" style={{ textAlign: 'center', width: '100%', position: 'fixed', bottom: 0, zIndex: 1500 }}>
                        <Grid data={data} className="mobileFooterGrid" onClick={this.menuClick} hasLine={false} />
                    </Footer>
                </Layout >
            )

        }
    }
}

const mapStateToProps = state => ({
    userCategories: state.test.userCategories
});


export default withRouter(connect(mapStateToProps, { fetchUserCategories })(MobileMain));
