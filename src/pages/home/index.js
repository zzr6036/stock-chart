import React from 'react'
import { Layout } from 'antd'
import Navbar from '../../components/Navbar/Navbar'
import StockChart from '../../components/StockChart/StockChart'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const { Sider, Content } = Layout;

const HomePage = props => {
    return (
        <Layout style={{ maxHeight: '100vh' }}>
            <Header />
            <Layout>
                <Sider><Navbar {...props} /></Sider>
                <Content style={{ background: '#fff', height: '90vh', overflowY: 'scroll' }}>
                    <StockChart />
                </Content>
            </Layout>
            <Footer />
        </Layout>
    )
}

export default HomePage
