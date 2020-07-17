import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
export const Axis = ({ pathData, data, parent }) => {
    const scaleX = pathData[0] && pathData[0].scaleX;
    const scaleY = pathData[0] && pathData[0].scaleY;
    const gXaxis = useRef()
    const gYaxis = useRef()
    useEffect(() => {
        if (scaleX) {
            var axisX = d3.axisBottom(scaleX)
            d3.select(gXaxis.current)
                .attr("transform", `translate(0,${parent.height})`)
                .call(axisX)
                .call(g => g.selectAll(".tick line")
                    .remove())
                .call(g => g.selectAll(".tick text")
                    .attr("y", 10)
                    .attr("opacity", 0.5))
                    .call(g=>g.select(".domain")
                    .remove()
                    )

        }
        if (scaleY) {
            var axisY = d3.axisLeft(scaleY)
                .tickSize(-parent.width + 20)
            // .tickValues(scaleY)
            d3.select(gYaxis.current)
                .attr("transform", `translate(30,0)`)
                .call(axisY)
                .call(g => g.select(".domain")
                    .remove())
                .call(g => g.selectAll(".tick:not(:first-of-type) line")
                    .attr("stroke-dasharray", "4,4"))
                    .call(g => g.selectAll(".tick line")
                    .attr("stroke-opacity", 0.5))
                .call(g => g.selectAll(".tick text")
                    .attr("x", -10)
                    .attr("opacity", 0.5)
                )
            // .attr("dy", 10))
        }
    }, [data, pathData])
    return (
        <>
            <g className="Xaxis" ref={gXaxis} ></g>
            <g className="Yaxis" ref={gYaxis} ></g>
        </>
    )

}