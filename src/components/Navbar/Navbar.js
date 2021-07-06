import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { connect } from "react-redux";
import { getStockList } from '../../actions/stock';

const menus = [
    { symbol: 'MSFT' },
    { symbol: 'AAPL' },
    { symbol: 'NFLX' },
    { symbol: 'ORCL' },
    { symbol: 'CMCSA' },
    { symbol: 'LUV' },
    { symbol: 'HOG' },
    { symbol: 'GOOG' },
    { symbol: 'GOOGL' },
    { symbol: 'AMZN' },
    { symbol: 'DAC' },
    { symbol: 'DDS' },
    { symbol: 'SBOW' },
    { symbol: 'UAN' },
    { symbol: 'FB' },
    { symbol: 'JPM' },
    { symbol: 'PYPL' },
]
const Navbar = props => {
    const { dispatch } = props
    const [selectedMenu, setSelectedMenu] = useState('')

    useEffect(() => {
        getSelectedMenuKey()
    }, [])

    const getSelectedMenuKey = () => {
        let selectedMenuSymbol = localStorage.getItem('symbol')
        if (!['', undefined, null].includes(selectedMenuSymbol)) {
            setSelectedMenu(selectedMenuSymbol)
        } else {
            setSelectedMenu('MSFT')
        }
    }
    const handleClick = e => {
        if (e && e.key) {
            let params = {
                symbol: e.key
            }
            setSelectedMenu(e.key)
            dispatch(getStockList(params))
        }
    }
    const renderMenu = () => {
        return (
            <>
                <Menu
                    onClick={handleClick}
                    style={{ height: '100vh', overflowY: 'scroll' }}
                    selectedKeys={selectedMenu}
                    mode="inline"
                >
                    {menus.map((item, idx) =>
                    (
                        <Menu.Item key={item.symbol}>
                            {item.symbol}
                        </Menu.Item>
                    )
                    )}
                </Menu>
            </>
        )
    }
    return (
        <>{renderMenu()}</>
    )
}

export default connect(null, null)(Navbar)
