import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { ChartDrawer } from "./chartDrawer";
import { Axis } from "./Axis";
export const TrendGraph = ({ data, options, sliderZoomState }) => {
  const [parent, setParent] = useState({ height: 300, width: 700 });
  const [pathData, setPathData] = useState([]);
  const [currentZoomState, setCurrentZoomState] = useState();
  const [circles, setCircles] = useState([]);
  const svg = useRef();
  const leftPadding = 50;
  const scaleY = d3.scaleLinear();
  const scaleX = d3.scaleTime();
  useEffect(() => {
    if (parent.width) {
      var newPathData = [];
      const height = parent.height,
        width = parent.width;

      const GetMinDate = (data) => {
        return d3.min(data.map((d) => new Date(d.Timestamp).getTime()));
      };

      const GetMaxDate = (data) => {
        return d3.max(data.map((d) => new Date(d.Timestamp).getTime()));
      };

      scaleX
        .range([leftPadding, width - 20])
        .domain([GetMinDate(data), GetMaxDate(data)]);
      if (sliderZoomState)
        scaleX.domain([sliderZoomState[0], sliderZoomState[1]]);
      scaleY.range([height, 40]).domain([0, 200]);
      var line = d3.line().x((d) => scaleX(new Date(d.Timestamp).getTime()));

      if (currentZoomState) {
        const newXScale = currentZoomState.rescaleX(scaleX);
        scaleX.domain(newXScale.domain());
      }
      if (options.respiration) {
        line.y((d) => {
          return scaleY(d.RR);
        });

        var path = {
          value: "RR",
          line: line(data),
          stroke: "#e31d93",
          scaleX,
          scaleY,
        };
        newPathData.push(path);
      }
      if (options.temperature) {
        line.y((d) => {
          return scaleY(d.Temp);
        });
        var path = {
          value: "Temp",
          line: line(data),
          stroke: "#e31d1d",
          scaleX,
          scaleY,
        };
        newPathData.push(path);
      }
      if (options.oxygenSaturation) {
        line.y((d) => {
          return scaleY(d.SPO2);
        });
        var path = {
          value: "SPO2",
          line: line(data),
          stroke: "#1dcae3",
          scaleX,
          scaleY,
        };
        newPathData.push(path);
      }
      if (options.pulse) {
        line.y((d) => {
          return scaleY(d.HRM);
        });
        var path = {
          value: "HRM",
          line: line(data),
          stroke: "#5f1de3",
          scaleX,
          scaleY,
        };
        newPathData.push(path);
      }
      if (options.bloodPressure) {
        line.y((d) => {
          return scaleY(d.BP_Sys);
        });
        var path = {
          value: "BP_Sys",
          line: line(data),
          stroke: "#fb873d",
          scaleX,
          scaleY,
        };
        newPathData.push(path);
        line.y((d) => {
          return scaleY(d.BP_Dia);
        });
        var path = {
          value: "BP_Dia",
          line: line(data),
          stroke: "#fb873d",
          scaleX,
          scaleY,
        };
        newPathData.push(path);
        setCircles([]);
      }

      setPathData(newPathData);
    }
  }, [data, options, parent, currentZoomState, sliderZoomState]);

  var zoomBehavior;
  useEffect(() => {
    // zoom
    var selected = d3.select("#dragrect");
    var el = svg.current.getBoundingClientRect();
    zoomBehavior = d3
      .zoom()
      .scaleExtent([1, 3000])
      .translateExtent([
        [leftPadding, 0],
        [el.width, el.height],
      ])
      .extent(function () {
        var e = this,
          w,
          h;
        return [
          [e.x.baseVal.value, 0],
          [e.width.baseVal.value, e.height.baseVal.value],
        ];
      })
      .on("zoom", () => {
        const zoomState = d3.zoomTransform(selected.node());
        setCurrentZoomState(zoomState);
      });
    // if need to add zoom on drag uncomment the bellow two lines
    // selected.call(zoomBehavior)

    // zoomBehavior.scaleTo(selected, 2000)
  }, [parent]);

  useEffect(() => {
    var div = document.getElementById("parentForGraph");
    if (div) {
      div = div.getBoundingClientRect();
      setParent({ width: div.width - 20, height: div.height - 20 });
    }
    window.addEventListener("resize", function (e) {
      var div = document.getElementById("parentForGraph");
      if (div) {
        div = div.getBoundingClientRect();
        setParent({ width: div.width, height: div.height });
      }
    });
  }, [0]);
  const mouseOut = (e) => {
    setCircles([]);
  };
  const mouseMove = (e) => {
    const timeFormat = (time) => {
      return new Date(time).getTime();
    };
    if (pathData.length > 0) {
      var x =
        e.clientX -
        document.getElementById("dragrect").getBoundingClientRect().x +
        40;
      var time = new Date(
        new Date(pathData[0].scaleX.invert(x)).setMilliseconds(28.131221)
      );
      var b = d3.bisector(function (d) {
        return new Date(d.Timestamp).getTime();
      }).left;
      var d = b(data, new Date(time).getTime());
      var val = data[d];
      const scaleX = pathData[0].scaleX,
        scaleY = pathData[0].scaleY;
      if (val) {
        var circle = {
          x: scaleX(timeFormat(val.Timestamp)),
          r: 5,
        };
        var circles = [];
        pathData.forEach((path) => {
          circles.push({
            ...circle,
            y: scaleY(val[path.value]),
            color: path.stroke,
            date: new Date(val.Timestamp),
            value: Math.floor(val[path.value]),
            index: d,
          });
        });
        setCircles(circles);
      }
    }
  };
  const ShowPreviousData = (e) => {
    const index = circles[0].index;
    var PreviousData = data.slice(index - 5, index);
    console.log(PreviousData);
  };
  return (
    <>
      <div
        className="h-full w-full"
        id="parentForGraph"
        style={{ maxHeight: "300px" }}
      >
        <svg
          width="100%"
          height={parent.height + 50}
          style={{ maxHeight: "300px" }}
          id="lineGraph"
        >
          <defs>
            <clipPath id="myclip">
              <rect
                x={leftPadding}
                y={20}
                width={parent.width - 20}
                height={parent.height}
              ></rect>
            </clipPath>
          </defs>
          <Axis pathData={pathData} data={data} parent={parent} />
          <g clipPath="url(#myclip)">
            {pathData.map((path) => (
              <ChartDrawer pathData={path} key={path.value} data={data} />
            ))}
          </g>
          {circles.map((circle, index) => (
            <g key={index} onClick={() => ShowPreviousData(circle.index)}>
              <rect
                x={circle.x - 30}
                y={circle.y - 50}
                width={60}
                height={40}
                rx="5"
              ></rect>
              <text
                x={circle.x - 10}
                y={circle.y - 35}
                style={{ fill: "white", fontSize: "12px" }}
              >
                {circle.value}
              </text>
              <text
                x={circle.x - 22}
                y={circle.y - 20}
                style={{ fill: "grey", fontSize: "11px" }}
              >
                {circle.date.getHours()}:{circle.date.getMinutes()}:
                {circle.date.getSeconds()}
              </text>
              <circle
                cx={circle.x}
                cy={circle.y}
                r={circle.r}
                fill={circle.color}
              ></circle>
            </g>
          ))}
          <rect
            x={leftPadding}
            y={20}
            width={parent.width - 20}
            height={parent.height}
            ref={svg}
            id="dragrect"
            style={{ fill: "none", pointerEvents: "all" }}
            onMouseOut={mouseOut}
            onMouseMove={mouseMove}
            onClick={ShowPreviousData}
          ></rect>
        </svg>
      </div>
    </>
  );
};
