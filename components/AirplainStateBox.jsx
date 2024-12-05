"use client"

import { getAirplainStatus } from "@/apis/passenger/airplain";
import useInterval from "@/hooks/useInterval";
import { useState } from "react";

export default function AirplainStateBox() {
  const flightStateArr = ['이륙', '정상운행', '난기류', '비상상황', '착륙'];
  const [flightNumber, setFlightNumber] = useState(100);
  const [flightState, setFlightState] = useState('착륙');

  useInterval(()=>{
    const stateFetcher = async () => {
      const data = await getAirplainStatus(flightNumber);
      setFlightState(data[0].flight_state);
    }

    stateFetcher();
  }, 3000);
  
  return (
    <div className="relative p-12 w-full flex flex-col gap-2">
      <h1 className="absolute left-20 top-20 text-2xl font-bold">비행기 상태</h1>
      <div className="flex flex-col items-center border-2 w-full p-4 gap-4 text-lg">
        <div className={`p-4 border-2 rounded ${flightState === '비상상황' ? 'bg-red-600 text-white' : 'bg-white'}`}>비상상황</div>
        <div className="border-2 border-gray-400 border-dashed h-8"/>
        <div className={`p-4 border-2 rounded ${flightState === '난기류' ? 'bg-orange-600 text-white' : 'bg-white'}`}>난기류</div>
        <div className="border-[2.5px] border-gray-400 border-dashed h-8"/>
        <div className="flex justify-between items-center w-full">
          <div className={`p-4 border-2 rounded ${flightState === '이륙' ? 'bg-green-600 text-white' : 'bg-white'}`}>
            이륙
          </div>
          <div className={`py-[2.5px] w-1/3 rounded
            ${flightState === '정상운행' ? 'bg-gradient-to-l from-green-600 to-gray-400' : 'bg-gray-400'}
            ${flightState === '이륙' ? 'bg-gradient-to-r from-green-600 to-gray-400' : 'bg-gray-400 '}
          `}/>
          <div className={`p-4 border-2 rounded ${flightState === '정상운행' ? 'bg-green-600 text-white' : 'bg-white'}`}>
            정상운행
          </div>
          <div className={`py-[2.5px] w-1/3 rounded
            ${flightState === '정상운행' ? 'bg-gradient-to-r from-green-600 to-gray-400' : 'bg-gray-400'}
            ${flightState === '착륙' ? 'bg-gradient-to-l from-green-600 to-gray-400' : 'bg-gray-400 '}
          `}/>
          <div className={`p-4 border-2 rounded ${flightState === '착륙' ? 'bg-green-600 text-white' : 'bg-white'}`}>
            착륙
          </div>
        </div>
        <div className="w-full px-8">
          <div className={`border-b-[6px] border-l-[6px] border-r-[6px] w-full h-12 ${flightState === '착륙' ? 'border-green-600' : 'border-gray-400'}`}/>
        </div>
      </div>
    </div>
  )
}