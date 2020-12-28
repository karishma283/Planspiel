//Taleh Muzaffarov and Rajat Ghosh

import React, { Component } from 'react'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Layout
} from 'antd';
import { register } from '../../actions/testAction'
import { connect } from 'react-redux';
import lscache from 'lscache'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import bcrypt from 'bcryptjs'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class Register extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = values => {

        console.log(values);

        var salt = bcrypt.genSaltSync(10);
        values.password = bcrypt.hashSync(values.password, salt);
        new Promise((resolve, reject) => {
            resolve(
                this.props.register(values)
            )
            reject(() => {
            })
        })
            .then(res => {
                if (lscache.get('usertoken')) {
                    this.props.history.push('/')
                }
            })


    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    redirectLogin = () => {
        this.props.history.push("/login")
    }


    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };



    render() {
        const { autoCompleteResult } = this.state;

        const layout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };




        return (
            <div id="register">
                <Layout style={{ width: '100vw', height: '100vh', alignItems: 'center', backgroundColor: '#00284d' }}>

                    <Form className="register-form"

                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.handleSubmit}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <div className="login-logo">
                            <img src="https://www.fiveberg.de/assets/images/logo_skyblue.png" />
                        </div>
                        <Form.Item
                            name="firstname"
                            rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>

                        <Form.Item
                            name="lastname"
                            rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>

                        <Form.Item
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please enter your E-mail!',
                                },
                            ]}
                            name="email"

                        >
                            <Input placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ]}
                            name="password"
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Register
                            </Button>

                            <a onClick={this.redirectLogin} className="login-form-forgot">Already have an account?</a>
                        </Form.Item>
                    </Form>
                </Layout >
            </div >
        );
    }
}
const mapStateToProps = state => ({});
export default withRouter(connect(mapStateToProps, { register })(Register))
