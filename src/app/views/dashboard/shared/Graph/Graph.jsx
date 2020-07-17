import React, { useState, useEffect, } from 'react'
import DataFile from "../utils/DummyData_00.json"
import * as d3 from "d3"
import { Draw } from './helper';
export const Graph = (setAvgRps,setAvgSpo,setAvgPulse,setAvgTemp,setAvgBPlow,setAvgBPhigh,setAvgHRM) => {
    var time = 60;
    var rand =0;
    var box = { width: 450, height: 100 }
    useEffect(() => {
        var path;
        var int=0;
        var data = [DataFile[time-1]];
        console.log(data)
        var maindata=[DataFile[0],DataFile[1],DataFile[2],DataFile[3]];
        function myavg() {      
          setAvgRps(Math.floor(maindata[rand].RR))
            setAvgSpo(Math.floor(maindata[rand].SPO2))
            setAvgPulse(Math.floor(maindata[rand].HRM))
            setAvgTemp((maindata[rand].Temp))
            setAvgBPlow(Math.floor(maindata[rand].BP_Dia))
            setAvgBPhigh(Math.floor(maindata[rand].BP_Sys))
            setAvgHRM(Math.floor(maindata[rand].HRM))
            rand += 1;
            if(rand>3){
                rand=0;
            }
            
        }
        myavg();
        setInterval(myavg, 7000);
        
        function DrawGraph() {
           
            var parent = document.getElementById("mainGrid");
            if (parent)
            {
                parent=parent.getBoundingClientRect()
                box = { width: parent.width, height: parent.height }
            }
            data.push(DataFile[time])
            if (time >= DataFile.length - 2) {
                time = 60;
            }
            time += 1;
            const width = box.width,
                height = box.height;
            function GetDateFormat(data) {
                return  new Date(data.Timestamp).getTime()
            }
            var diff = GetDateFormat(data[1]) - GetDateFormat(data[0])
            var x = d3.scaleLinear().range([0, width + 20])
            x.domain([(GetDateFormat(data[data.length - 1])-(58*diff)), GetDateFormat(data[data.length - 1])]);
            var y = d3.scaleLinear().range([height - 10, 10]);
            var translate=x(GetDateFormat(DataFile[time - 60]));
         
            // for RR
           // y.domain([0, 16])
           y.domain([12, 16])
            const line = d3.line()
                .x(d => x(new Date(d.Timestamp).getTime()))
                .y(d => y(d.RR))
            path = d3.select("#RRLine");
            Draw(path,line,data,translate,null,400)

                //  for SPO2
                y.domain([95, 100])
                line.y(d => y(d.SPO2))
            var path = d3.select("#SPO2Line");
               
                Draw(path,line,data,translate,null,400)

                //  for PULSELine
                y.domain([75, 160])
                line.y(d => y(d.HRM))
            var path = d3.select("#PULSELine");
                Draw(path,line,data,translate,DrawGraph,400)
          
            if (data.length > 60)
                data.shift()
        }
        
        DrawGraph()
        
    }, [0]);
    return {
        RESP: ({ style }) => {
            return (
                <>
                    <svg width="100%"  >
                        <path id="RRLine" className={style} strokeWidth="2px" fill="none" ></path>
                    </svg>
                </>
            )
        },
        SPO: ({style}) => {
            return (
                <svg width="100%" >
                        <path id="SPO2Line" className={style}  strokeWidth="2px" fill="none" ></path>
                </svg>
            )
        },
        PULSE: ({style}) => {
            return (
                <svg width="100%" >
                        <path id="PULSELine" className={style} strokeWidth="2px" fill="none" ></path>
                </svg>
            )
        }

    }
}
