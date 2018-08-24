import React from 'react';
import { Row,Col,Button,Modal } from 'antd';
import './index.less';

const confirm = Modal.confirm;

export default class Modals extends React.Component{

    state = {
        visible1: false,
        visible2: false,
        ModelText: '异步弹窗',
        confirmLoading2: false,
        visible3: false,
        visible4: false,
        loading: false,
    }
    showModal = (key) => {
        console.log('弹窗显示了');
        this.setState({
            [key]: true
        });
    }
    handleOk = (key) => {
        console.log('点击了 OK');
        this.setState({
            [key]: false,
        });
    }
    handleOk2 = (key) => {
        console.log('点击了 OK');
        this.setState({
            ModelText: '弹窗将在2s后关闭',
            confirmLoading: true
        });
        setTimeout(() => {
            this.setState({
                ModelText: '异步弹窗',
                [key]: false,
                confirmLoading: true
            });
        },2000);
    }
    handleOk3 = (key) => {
        console.log('点击了 OK');
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, [key]: false });
        },3000);
    }
    handleCancel = (key) => {
        console.log('点击了 CANCEL');
        this.setState({
            [key]: false,
        });
    }
    showConfirm1 = () => {
        confirm({
            title: 'DO YOU WANT DELETE THESE ITEMS?',
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel () {
                console.log('Cancel');
            },
        });
    }
    showDeleteConfirm1 = () => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    showConfirm2 = () => {
        confirm({
            title: 'DO YOU WANT DELETE THESE ITEMS?',
            content: '当你点击OK，弹窗将在1s后关闭',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5? resolve : reject, 1000);
                }).catch(() => console.log('Ooop errors! '));
            },
            onCancel () { console.log('Cancel'); },
        });
    }
    showConfirm3 = (key) => {
        Modal[key]({
            title: 'THIS IS A CONFIRM TITLE',
            content: (
                <div>
                    <p>SOME MESSAGES...SOME MESSAGES...</p> 
                    <p>SOME MESSAGES...SOME MESSAGES...</p>  
                </div>
            ),
            onOk() {},
        });
    }
    showConfirm4 = () => {
        const modal = Modal.success({
            title: 'THIS IS A CONFIRM TITLE',
            content: (
                <div>
                    <p>提示信息将在1.5s后关闭</p> 
                </div>
            ),
            onOk() {},
        });
        setTimeout(()=>{ modal.destroy() },1500);
    }

    render(){
        return (
            <div>
                <Row>
                    <Col span={11} className="ui-item">

                        <div className="item-wrap">
                            <div className="item-title">基本</div>
                            <div className="item-body">
                                <Button type="primary" onClick={this.showModal.bind(this,'visible1')}>打开弹窗</Button>
                                <Modal
                                    title="弹窗"
                                    visible={this.state.visible1}
                                    onOk={this.handleOk.bind(this,'visible1')}
                                    onCancel={this.handleCancel.bind(this,'visible1')}
                                    okText='确定'
                                    cancelText='取消'     
                                >
                                    <p>Some contents ...</p>
                                    <p>Some contents ...</p>
                                    <p>Some contents ...</p>
                                </Modal>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">自定义页脚</div>
                            <div className="item-body">
                                <Button type="primary" onClick={this.showModal.bind(this,'visible3')}>打开弹窗</Button>
                                <Modal
                                    title="弹窗"
                                    visible={this.state.visible3}
                                    onOk={this.handleOk3.bind(this,'visible3')}
                                    onCancel={this.handleCancel.bind(this,'visible3')}  
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel.bind(this,'visible3')}>Return</Button>,
                                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk3.bind(this,'visible3')}>Submit</Button>,
                                    ]}   
                                >
                                    <p>Some contents ...</p>
                                    <p>Some contents ...</p>
                                    <p>Some contents ...</p>
                                </Modal>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">确认对话框 用Promise延时关闭</div>
                            <div className="item-body">
                                <Button onClick={this.showConfirm2}>Confirm</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">Model 自动关闭</div>
                            <div className="item-body">
                                <Button onClick={this.showConfirm4}>Confirm</Button>
                            </div>
                        </div>
                        
                    </Col>
                    <Col span={11} className="ui-item">
                    
                        <div className="item-wrap">
                            <div className="item-title">异步关闭</div>
                            <div className="item-body">
                                <Button type="primary" onClick={this.showModal.bind(this,'visible2')}>打开弹窗</Button>
                                <Modal
                                    title="弹窗"
                                    visible={this.state.visible2}
                                    onOk={this.handleOk2.bind(this,'visible2')}
                                    confirmLoading={this.state.confirmLoading2}
                                    onCancel={this.handleCancel.bind(this,'visible2')}     
                                >
                                    <p>{ this.state.ModelText }</p>
                                </Modal>
                            </div>
                        </div>
                        
                        <div className="item-wrap">
                            <div className="item-title">确认对话框</div>
                            <div className="item-body">
                                <Button onClick={this.showConfirm1}>Confirm</Button>
                                <Button tyep="dashed" onClick={this.showDeleteConfirm1}>Detele</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">信息提示框</div>
                            <div className="item-body">
                                <Button onClick={this.showConfirm3.bind(this,'info')}>Info</Button>
                                <Button onClick={this.showConfirm3.bind(this,'success')}>Success</Button>
                                <Button onClick={this.showConfirm3.bind(this,'error')}>Error</Button>
                                <Button onClick={this.showConfirm3.bind(this,'warning')}>Warning</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">自定义页脚按钮属性</div>
                            <div className="item-body">
                                <Button type="primary" onClick={this.showModal.bind(this,'visible4')}>打开弹窗</Button>
                                <Modal
                                    title="弹窗"
                                    visible={this.state.visible4}
                                    onOk={this.handleOk2.bind(this,'visible4')}
                                    onCancel={this.handleCancel.bind(this,'visible4')}
                                    okButtonProps={{ disabled: true }}  
                                    cancelButtonProps={{ disabled: true }}   
                                >
                                    <p>页脚按钮不可点击</p>
                                </Modal>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}