
//Taleh Muzaffarov 

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Modal, List, Button, WhiteSpace, WingBlank, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchAllCategories, addCategory } from '../../actions/testAction'
import { SportsKabaddi, Casino, Language, Brightness4, Traffic, Gavel, MonetizationOn, LocalFlorist, Fingerprint, Favorite } from "@material-ui/icons";

import { Card } from 'antd';
import merge from 'lodash/merge';
import { Checkbox } from 'antd';
import { log } from 'util';
const operation = Modal.operation;

const { Meta } = Card;
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            chosenCategories: [],
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        };
    }
    componentDidMount() {
        console.log(this.props.visible);

        this.setState({
            visible: this.props.visible
        })
        this.props.fetchAllCategories()
        var array = []
        if (this.props.userCategories.length > 0) {
            this.props.userCategories.map((val, key) => {
                array.push(val._id)
            })
        }
        this.setState({ chosenCategories: array })

    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    selectCategory = (id) => {
        this.setState({
            chosenCategories: merge([], this.state.chosenCategories, id)
        })

    }



    onChange = (e, key, checked) => {
        if (checked) {
            var array = [...this.state.chosenCategories]; // make a separate copy of the array
            var index = array.indexOf(key)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ chosenCategories: array });
            }
        } else {
            this.setState({
                chosenCategories: [...this.state.chosenCategories, key],
            });
        }
    };

    onCheckAllChange = e => {
        var array = []
        this.props.allCategories.map((val, key) => { array.push(val._id) })
        this.setState({
            chosenCategories: e.target.checked ? array : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    addCategory = () => {

        this.props.addCategory(this.state.chosenCategories)
        this.setState({ visible: false });
        this.props.setVisible()
    }
    cancelAction = () => {
        this.setState({ visible: false });
        this.props.setVisible()

    }
    render() {
        const { allCategories, mode } = this.props
        const data = Array.from(allCategories).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            name: _val.name,
            key: _val._id
        }));
        if (!this.state.chosenCategories.length == 0) {
            if (mode == "profile") {
                var footer = [{ text: "Cancel", onPress: this.cancelAction }, { text: "Ok", onPress: this.addCategory }]
            }
            else {
                var footer = [{ text: "Ok", onPress: this.addCategory }]

            }
            var alert = null
        }
        else {
            footer = []
            alert = "Please add at least one category"

        }
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
        return (
            <WingBlank>
                <WhiteSpace />
                <Modal
                    className="allCategory"
                    visible={this.state.visible}
                    closable={true}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="Choose Category to Follow"
                    footer={footer}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}

                >
                    <div style={{ height: '60%', overflow: 'scroll' }} >
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            Check all
                        </Checkbox>
                        <Grid data={data} activeStyle={false} className="allCategories-grid" columnNum={3}
                            renderItem={dataItem => {

                                if (this.state.chosenCategories.includes(dataItem.key)) {
                                    var checked = true
                                }
                                else {
                                    checked = false
                                }
                                return <Checkbox
                                    style={{ zIndex: 1000, height: 60 }}
                                    checked={checked}
                                    disabled={this.state.disabled}
                                    onChange={(e) => this.onChange(e, dataItem.key, checked)}
                                >
                                    <Card
                                        hoverable
                                        style={{ width: '100%', position: 'absolute', marginTop: -20, left: 0 }}
                                        cover={CategoryIcon(dataItem.name)}
                                    >
                                        <Meta style={{ fontSize: 8 }} description={dataItem.name} />
                                    </Card>
                                </Checkbox>
                            }} />
                        {alert}
                    </div>
                </Modal>
            </WingBlank >
        );
    }
}
const mapStateToProps = state => ({
    allCategories: state.test.allCategories,
    userCategories: state.test.userCategories
});
export default withRouter(connect(mapStateToProps, { fetchAllCategories, addCategory })(AddCategory));
