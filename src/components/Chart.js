
import { createChart, ColorType, } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import rawData from '../data.json';

export const Chart = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const mainSeries = chart.addCandlestickSeries();
            const candleStickData = generateCandlestickData();
            mainSeries.setData(candleStickData);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

function generateCandlestickData() {
    const result = []

    for (var i = 1; i < rawData.time.length; i++) {
        result.push(
            {
                time: new Date(rawData.time[i] * 1000).toISOString().split("T")[0],
                open: rawData.open[i],
                high: rawData.max[i],
                low: rawData.min[i],
                close: rawData.finalPrice[i]
            }
        )
    }

    return result
}