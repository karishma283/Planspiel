//Taleh Muzaffarov and Rajat Ghosh
import React, { Component } from 'react'
import { Drawer, Menu, Button, Checkbox, Card, Modal } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import { Grid } from 'antd-mobile'
import { connect } from 'react-redux';
import { fetchUserCategories, fetchNews } from '../../actions/testAction'
import AddCategory from './AddCategory';

const operation = Modal.operation;

const { Meta } = Card;
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.showDrawer,
            addCategory: false,
        };
    }

    componentDidMount() {
        this.props.fetchUserCategories()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible !== prevState.visible) {
            return { visible: nextProps.visible };
        }
        else return null;
    }
    onClose = () => {
        this.props.onClose()
    };
    addCategory = () => {
        this.setState({ addCategory: true })
        //this.props.onClose()
    }
    setVisible = () => {
        this.setState({ addCategory: false })
    }
    renderNews = (id) => {
        this.props.fetchNews(id)
        //this.props.onClose()
    }
    render() {
        const { userCategories } = this.props
        return (<div style={{ backgroundColor: 'white', height: '76vh' }}>
            {!userCategories || this.state.addCategory ? <AddCategory visible={true} setVisible={this.setVisible} /> : null}
            <Button
                style={{
                    backgroundColor: '#001529',
                    borderRadius: '50%',
                    fontSize: 20,
                    height: 40,
                    position: 'absolute',
                    bottom: 60,
                    right: 15,
                    padding: 1
                }}
                type="primary" onClick={this.addCategory}> {/* <EditOutlined style={{ margin: '0 8px' }} /> */}</Button>

            {/* <Grid data={this.props.userCategories} hasLine={false} activeStyle={false} className="userCategories-grid" columnNum={3}
                renderItem={dataItem => {
                    return <Card
                        hoverable
                        style={{ width: '100%', position: 'absolute', left: 0, padding: 5, margin: 5 }}
                    >
                        <Meta style={{ fontSize: 12 }} description={dataItem.name} />
                    </Card>
                }} /> */}
            {<Menu style={{ width: '100%' }} mode="vertical">
                {this.props.userCategories.length > 1 ? <Menu.Item key="0" onClick={() => this.renderNews()}>All</Menu.Item> : null}
                {
                    Object.values(this.props.userCategories).map((val, key) =>
                        <Menu.Item key={key + 1} onClick={() => this.renderNews(val._id)}>{val.name}</Menu.Item>
                    )
                }
            </Menu>}
        </div>
        )
    }
}
const mapStateToProps = state => ({
    userCategories: state.test.userCategories,
});
export default connect(mapStateToProps, { fetchUserCategories, fetchNews })(Categories)
