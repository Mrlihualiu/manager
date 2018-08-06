import React from 'react';
import { Row,Col } from '../node_modules/antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';

export default class Admin extends React.Component{

    render() {
        return (
            <Row>
                <Col span="3">
                    <NavLeft></NavLeft>
                </Col>
                <Col span="21">
                    <Header></Header>
                    <Row></Row>
                    <Footer></Footer>
                </Col>
            </Row>
        );
    }
}