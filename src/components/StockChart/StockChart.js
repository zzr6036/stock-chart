import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
import { getStockList } from '../../actions/stock';
import EChartsReactCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/custom';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/brush';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/chart/candlestick';
import "echarts/lib/component/title";
import 'echarts/lib/component/dataZoom';
import { Empty } from 'antd';

const ChartWrapper = styled.div`
   margin-top: 20px;
`;

const EmptyWrapper = styled.div`
   margin: 30px auto;
`;
const StockChart = props => {
    const { stocks, selected_stock, dispatch } = props
    let selectedMenuSymbol = localStorage.getItem('symbol')

    var upColor = '#00da3c';
    var downColor = '#ec0000';

    useEffect(() => {
        getData()
    }, [selectedMenuSymbol])

    const getData = () => {
        let params = {}
        if (!['', undefined, null].includes(selectedMenuSymbol)) {
            params = {
                symbol: selectedMenuSymbol
            }
        } else {
            params = {
                symbol: 'MSFT'
            }
        }
        dispatch(getStockList(params))
    }

    const splitData = rawData => {
        var categoryData = [];
        var ascendCategoryData = []
        var values = [];
        var ascendValues = []
        if (rawData && Object.keys(rawData).length > 0) {
            for (let key in rawData) {
                categoryData.push(key)
                ascendCategoryData.unshift(key)
                values.push([
                    rawData[key]['1. open'] && Number(rawData[key]['1. open']),
                    rawData[key]['4. close'] && Number(rawData[key]['4. close']),
                    rawData[key]['3. low'] && Number(rawData[key]['3. low']),
                    rawData[key]['2. high'] && Number(rawData[key]['2. high']),
                    rawData[key]['5. volume'] && Number(rawData[key]['5. volume']),
                ])
                ascendValues.unshift([
                    rawData[key]['1. open'] && Number(rawData[key]['1. open']),
                    rawData[key]['4. close'] && Number(rawData[key]['4. close']),
                    rawData[key]['3. low'] && Number(rawData[key]['3. low']),
                    rawData[key]['2. high'] && Number(rawData[key]['2. high']),
                    rawData[key]['5. volume'] && Number(rawData[key]['5. volume']),
                ])
            }
        }
        return {
            categoryData: categoryData,
            values: values,
            ascendCategoryData: ascendCategoryData,
            ascendValues: ascendValues
        };
    }

    const splitOHLCData = rawData => {
        var categoryData = [];
        var ascendCategoryData = []
        var values = [];
        var ascendValues = []
        var index = 0
        var ascIndex = rawData && Object.keys(rawData).length
        if (rawData && Object.keys(rawData).length > 0) {
            for (let key in rawData) {
                categoryData.push(key)
                ascendCategoryData.unshift(key)
                values.push([
                    index,
                    rawData[key]['1. open'] && Number(rawData[key]['1. open']),
                    rawData[key]['4. close'] && Number(rawData[key]['4. close']),
                    rawData[key]['3. low'] && Number(rawData[key]['3. low']),
                    rawData[key]['2. high'] && Number(rawData[key]['2. high']),
                    rawData[key]['5. volume'] && Number(rawData[key]['5. volume']),
                ])
                ascendValues.unshift([
                    ascIndex,
                    rawData[key]['1. open'] && Number(rawData[key]['1. open']),
                    rawData[key]['4. close'] && Number(rawData[key]['4. close']),
                    rawData[key]['3. low'] && Number(rawData[key]['3. low']),
                    rawData[key]['2. high'] && Number(rawData[key]['2. high']),
                    rawData[key]['5. volume'] && Number(rawData[key]['5. volume']),
                ])
                ++index
                --ascIndex
            }
        }
        return {
            categoryData: categoryData,
            values: values,
            ascendCategoryData: ascendCategoryData,
            ascendValues: ascendValues
        };
    }

    const getCandleChartOption = () => {
        if (stocks && Object.keys(stocks).length > 0) {
            var data = splitData(stocks);
            return {
                backgroundColor: '#fff',
                animation: false,
                title: {
                    left: 'center',
                    text: 'Candle Sticks'
                },
                legend: {
                    top: 25,
                    right: 65,
                    data: ['Dow-Jones index']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    position: function (pos, params, el, elRect, size) {
                        var obj = { top: 10 };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    },
                    extraCssText: 'width: 170px'
                },
                axisPointer: {
                    link: { xAxisIndex: 'all' },
                    label: {
                        backgroundColor: '#777'
                    }
                },
                visualMap: {
                    show: false,
                    seriesIndex: 5,
                    dimension: 2,
                    pieces: [{
                        value: 1,
                        color: downColor
                    }, {
                        value: -1,
                        color: upColor
                    }]
                },
                grid: [
                    {
                        left: '10%',
                        right: '8%',
                        height: '50%'
                    },
                    {
                        left: '10%',
                        right: '8%',
                        top: '63%',
                        height: '16%'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.ascendCategoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        splitLine: { show: false },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            z: 100
                        }
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: data.ascendCategoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        splitArea: {
                            show: true
                        }
                    },
                    {
                        type: 'value',
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        axisLabel: { show: false },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        splitLine: { show: false }
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        xAxisIndex: [0, 1],
                        type: 'slider',
                        top: '85%',
                        start: 0,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: 'Dow-Jones index',
                        type: 'candlestick',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data.ascendValues,
                        itemStyle: {
                            color: upColor,
                            color0: downColor,
                            borderColor: null,
                            borderColor0: null
                        },
                        tooltip: {
                            formatter: function (param) {
                                param = param[0];
                                return [
                                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                    'Open: ' + param.data[0] + '<br/>',
                                    'Close: ' + param.data[1] + '<br/>',
                                    'Lowest: ' + param.data[2] + '<br/>',
                                    'Highest: ' + param.data[3] + '<br/>'
                                ].join('');
                            }
                        }
                    }
                ]
            }
        }
    }

    const getOHLCChartOption = () => {
        if (stocks && Object.keys(stocks).length > 0) {
            var data = splitOHLCData(stocks);

            return {
                backgroundColor: '#fff',
                animation: false,
                title: {
                    left: 'center',
                    text: 'OHLC Chart'
                },
                legend: {
                    top: 25,
                    right: 65,
                    data: ['Dow-Jones index']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    position: function (pos, params, el, elRect, size) {
                        var obj = { top: 10 };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    },
                    extraCssText: 'width: 170px'
                },
                axisPointer: {
                    link: { xAxisIndex: 'all' },
                    label: {
                        backgroundColor: '#777'
                    }
                },
                grid: [
                    {
                        left: '10%',
                        right: '8%',
                        bottom: 150
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.ascendCategoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        splitLine: { show: false },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            z: 100
                        }
                    }
                ],
                yAxis: [
                    {
                        scale: true,
                        splitArea: {
                            show: true
                        }
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100,
                        minValueSpan: 10
                    },
                    {
                        show: true,
                        type: 'slider',
                        bottom: 60,
                        start: 0,
                        end: 100,
                        minValueSpan: 10
                    }
                ],
                series: [
                    {
                        name: 'Dow-Jones index',
                        type: 'custom',
                        renderItem: function (params, api) {
                            var xValue = api.value(0);
                            var openPoint = api.coord([xValue, api.value(1)]);
                            var closePoint = api.coord([xValue, api.value(2)]);
                            var lowPoint = api.coord([xValue, api.value(3)]);
                            var highPoint = api.coord([xValue, api.value(4)]);
                            var halfWidth = api.size([1, 0])[0] * 0.35;
                            var style = api.style({
                                stroke: api.visual('color')
                            });
                            return {
                                type: 'group',
                                children: [{
                                    type: 'line',
                                    shape: {
                                        x1: lowPoint[0], y1: lowPoint[1],
                                        x2: highPoint[0], y2: highPoint[1]
                                    },
                                    style: style
                                }, {
                                    type: 'line',
                                    shape: {
                                        x1: openPoint[0], y1: openPoint[1],
                                        x2: openPoint[0] - halfWidth, y2: openPoint[1]
                                    },
                                    style: style
                                }, {
                                    type: 'line',
                                    shape: {
                                        x1: closePoint[0], y1: closePoint[1],
                                        x2: closePoint[0] + halfWidth, y2: closePoint[1]
                                    },
                                    style: style
                                }]
                            };

                        },
                        dimensions: [null, 'open', 'close', 'lowest', 'highest'],
                        encode: {
                            x: 0,
                            y: [1, 2, 3, 4],
                            tooltip: [1, 2, 3, 4]
                        },
                        data: data.ascendValues
                    }
                ]
            }
        }
    }

    const renderCandleChart = () => {
        if (stocks && Object.keys(stocks).length > 0) {
            return (
                <ChartWrapper >
                    <EChartsReactCore
                        echarts={echarts}
                        option={getCandleChartOption()}
                        style={{ width: '100%', height: '45vh' }}
                    />
                </ChartWrapper>
            )
        }
    }

    const rendleOHLCChart = () => {
        if (stocks && Object.keys(stocks).length > 0) {
            return (
                <ChartWrapper >
                    <EChartsReactCore
                        echarts={echarts}
                        option={getOHLCChartOption()}
                        style={{ width: '100%', height: '45vh' }}
                    />
                </ChartWrapper>
            )
        }
    }
    return (
        <>
            {stocks && Object.keys(stocks).length > 0 ?
                <>
                    {renderCandleChart()}
                    {rendleOHLCChart()}
                </> : <EmptyWrapper><Empty /></EmptyWrapper>
            }

        </>
    )
}

const mapStateToProps = state => {
    return {
        stocks: state.stock.stock_list,
        selected_stock: state.stock.selected_stock
    };
};

export default connect(
    mapStateToProps,
    null
)(StockChart);
