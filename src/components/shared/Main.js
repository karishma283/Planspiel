//Taleh Muzaffarov and Rajat Ghosh

import React, { Component } from 'react'
import { ButtonMobile } from 'antd-mobile';
import { Layout, Menu, Breadcrumb, Icon, Typography, Button } from 'antd';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { testAction } from '../../actions/testAction'
import '../../index.css';
import ContentList from '../ContentList'
import { Desktop, Mobile, Tablet } from '../Responsive'
import { Card, WhiteSpace, List, Grid } from 'antd-mobile';
import PrivateRoute from '../PrivateRoute'
import MobileMain from './MobileMain'
import DesktopMain from './DesktopMain'
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

class Test extends Component {
    constructor(props) {
        super()
        this.state = {}
    }

    handleClick = () => {
        this.props.testAction();
    }
    render() {

        return (
            <div>
                <Mobile>
                    <MobileMain />
                </Mobile>
                <Desktop>
                    <DesktopMain />
                </Desktop>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    test: state.test.test,
});


export default withRouter(connect(mapStateToProps, { testAction })(Test));
