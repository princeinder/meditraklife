import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
export const ChartDrawer = ({ pathData, data }) => {
  const path = useRef();
  const [circle, setCircle] = useState({});
  useEffect(() => {
    // if (pathData.line) {

    d3.select(path.current)
      // .transition()
      .attr("d", () => pathData.line);
    // }
  }, [pathData]);
  const handleMouseMove = (e) => {
    const timeFormat = (time) => {
      return new Date(time);
    };
    var x =
      e.clientX - document.getElementById("myclip").getBoundingClientRect().x;

    var time = new Date(
      new Date(pathData.scaleX.invert(x)).setMilliseconds(28.131221)
    );
    var b = d3.bisector(function (d) {
      return new Date(d.Timestamp).getTime();
    }).left;
    var d = b(data, new Date(time).getTime());
    var val = data[d];
    const scaleX = pathData.scaleX,
      scaleY = pathData.scaleY;
    var circle = {
      x: scaleX(timeFormat(val.Timestamp)),
      y: scaleY(val[pathData.value]),
      r: 5,
      color: pathData.stroke,
    };
    setCircle(circle);
  };
  const handleMouseLeave = () => {
    // setCircle({})
  };

  return (
    <>
      <path
        className="line"
        stroke={pathData.stroke}
        strokeWidth="2px"
        fill="none"
        ref={path}
      ></path>
    </>
  );
};
