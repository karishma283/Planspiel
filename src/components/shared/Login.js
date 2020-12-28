//Taleh Muzaffarov and Rajat Ghosh
import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import '../../index.css'
import lscache from 'lscache'
import { login } from '../../actions/testAction'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { log } from 'util';

class Login extends Component {
    handleSubmit = values => {
        //e.preventDefault();

        new Promise((resolve, reject) => {
            resolve(
                this.props.login(values)
            )
        })
            .then(res => {
                if (lscache.get('usertoken')) {
                    this.props.history.push('/')
                }
            })


    };
    redirectRegister = () => {
        this.props.redirect("/register")
    }
    render() {

        return (
            <div id="login">
                <Layout style={{ width: '100vw', height: '100vh', alignItems: 'center', backgroundColor: '#00284d' }}>
                    <Form onFinish={this.handleSubmit} className="login-form">
                        <div className="login-logo">
                            <img src="https://www.fiveberg.de/assets/images/logo_skyblue.png" />
                        </div>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}

                        >

                            <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="E-mail"
                            />

                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >

                            <Input
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button >
                            <a href="">
                                Forgot password ?
                            </a>
                            <a onClick={this.redirectRegister} className="login-form-forgot">JOIN NOW</a>
                        </Form.Item>
                    </Form>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => ({});
export default withRouter(connect(mapStateToProps, { login })(Login))
