"""

This is the dummy vital stats generating module.


Sensor Parameters are as follows:

1. Respiration Rate [breaths/ min, avg_range: 12-16/min] 
2. Heart Rate [beats/ min, avg_range: 75-160/min]
3. Temperature [degrees Fahrenheit, avg_range: 97.7-99.5 F]
4. Blood Pressure [systolic pressure mmHg/ diastolic pressure mmHg, avg_range: 70-190/40-100 mmHg]
5. Spo2 [blood oxygenation, avg_range: 95-100%]

"""

# from __future__ import <>

__all__ = ['', '', '']
__version__ = '0.0'
__author__ = 'Pallavi Mishra'

import os
import sys
import json 
from datetime import datetime
from datetime import timedelta
import random
import struct
import numpy as np
from scipy import signal as sg

import matplotlib.pylab as plt





def create_per_minute_dummy_readings(num_minutes):
	data = []
	init_timestamp = datetime.now() 

	for i in range(num_minutes):

		ts = init_timestamp + timedelta(seconds=60*i)  
		rr_measure = random.uniform(12,16)
		hrm_measure = random.uniform(75,160)
		temp_measure = random.uniform(97.7,99.5)
		bp_measure_sys = random.uniform(70,190)
		bp_measure_dia = random.uniform(40,100)
		spo_measure = random.uniform(95,100)


		# create {key:value mapping} 
		sample = {
		"Timestamp":ts.isoformat(),
		"RR":rr_measure, 
	   	"HRM":hrm_measure, 
	   	"Temp":temp_measure,
	   	"BP_Sys":bp_measure_sys,
	   	"BP_Dia":bp_measure_dia,
	   	"SPO2":spo_measure }

	   	data.append(sample)

   	return data


def factor(shape, h, i):
    if shape == "triangle":
        return (1/(h*h) * (-1)**i)
    else:
        return (1/h)

def create_wave(n, harmonics, f, amp, base):
    t = np.linspace(0, 1, n)
    y = np.zeros(n)
    # compute fundamental and each harmonic
    odd = 1
    mult = 2
    for i in range(int(harmonics)+1):
        h = i * mult + odd
        yh = (np.sin(h * 2 * np.pi * f * t)/h)*amp 
        y = (y + yh)
    return y + base

def create_waveform(num_minutes):

	
	freq = 440
	samples = 44100
	sampling_rt = 44100
	x = np.arange(samples)

	# #sin wave
	# y_sin = 100*np.sin(2*np.pi*freq*x/sampling_rt)
	# #square wave
	# y_sq = 100*sg.square(2*np.pi*freq*x/sampling_rt)
	# #sawtooth wave
	# y_sawtooth = 100*sg.sawtooth(2*np.pi*freq*x/sampling_rt)

	data = []
	init_timestamp = datetime.now() 

	harmonics_hrm = 2
	y_hrm = create_wave(num_minutes,harmonics_hrm, 3000, 50, 110)
	harmonics_rr = 0
	y_rr = create_wave(num_minutes, harmonics_rr, 1000, 2, 14)

	for i in range(num_minutes):

		ts = init_timestamp + timedelta(seconds=60*i)  
		
		hrm_measure = y_hrm[i] + random.uniform(0,15)
		print("hrm:",hrm_measure)
			
		rr_measure = y_rr[i] + random.uniform(0,0.1)
		#print("rr:",rr_measure)
			
		temp_measure = random.uniform(97.7,99.5)
		bp_measure_sys = random.uniform(95,100)
		bp_measure_dia = random.uniform(50,60)
		spo_measure = random.uniform(95,100)


		# create {key:value mapping} 
		sample = {
		"Timestamp":ts.isoformat(),
		"RR":rr_measure, 
	   	"HRM":hrm_measure, 
	   	"Temp":temp_measure,
	   	"BP_Sys":bp_measure_sys,
	   	"BP_Dia":bp_measure_dia,
	   	"SPO2":spo_measure }

	   	data.append(sample)

   	return data

mydata = create_waveform(20000)

with open('DummyData_00.json', 'w') as outfile: 
	json.dump(mydata, outfile) 
	






