"use client";

import { postAirplainStatus } from "@/apis/captain/airplain";
import { getAirplainMenu, putAirplainMenu } from "@/apis/captain/menu";
import { postAirplainServe } from "@/apis/captain/serve";
import { postAirplainMenu } from "@/apis/crew/menu";
import { getAirplainStatus } from "@/apis/crew/status";
import interval from "@/constants/interval";
import useInterval from "@/hooks/useInterval";
import { useState } from "react";

export default function Captain() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [flightFood, setFlightFood] = useState([]); // 기내식 데이터 상태 관리
  const [captainFood, setCaptainFood] = useState([]); // 기내식 데이터 상태 관리
  const [mealService, setMealService] = useState(false); // 기내식 제공 상태 관리
  const [flightState, setFlightState] = useState('착륙'); // 비행기 상태 관리
  const flightStateArr = ['이륙', '정상운행', '난기류', '비상상황', '착륙'];
  const [loading, setLoading] = useState(false); // 로딩 상태

  const [flightNumber, setFlightNumber] = useState(100);
  const [captainId, setCaptainId] = useState(1);

  // 비행 상태 업데이트 함수
  async function updateFlightState(state) {
    try {
      const result = await postAirplainStatus(flightNumber, state)

      if (result) {
        setFlightState(state);
      } else {
        alert(`업데이트 실패`);
      }
    } catch (error) {
      console.error("Error updating flight state:", error);
      alert("비행 상태 업데이트 중 오류가 발생했습니다.");
    }
  }

  // 기내식 데이터 가져오는 함수
  async function fetchFlightFood() {
    try {
      const data = await getAirplainMenu(flightNumber, null);
      setFlightFood(data); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching flight food data:", error);
    }
  }

  // 기장 기내식 데이터 가져오는 함수
  async function fetchCaptainFood() {
    try {
      const data = await getAirplainMenu(flightNumber, '직원');
      setCaptainFood(data); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching flight food data:", error);
    }
  }

  // 비행기 상태 가져오는 함수
  async function fetchFlightStatus() {
    try {
      const data = await getAirplainStatus(flightNumber);
      setFlightState(data.flight_state); // 상태 업데이트
      setMealService(data.serve);
    } catch (error) {
      console.error("Error fetching flight food data:", error);
    }
  }


  // 기내식 제공 상태 업데이트 함수
  async function updateMealServiceStatus(status) {
    try {
      setLoading(true); // 로딩 상태 활성화
      const success = await postAirplainServe(flightNumber, status)

      if (success) {
        setMealService(status); // 상태 업데이트
      }
    } catch (error) {
      console.error("Error updating meal service status:", error);
      alert("기내식 제공 상태 업데이트 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  }

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useInterval(() => {
    fetchFlightFood();
    fetchCaptainFood();
    fetchFlightStatus();

    setIsLoading(false);
  }, interval);

  if (isLoading) {
    return (
      <p className="py-16 w-full text-center text-2xl font-black">
        로딩 중, 약 {interval/1000}초가 소요됩니다.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 비행기 상태 업데이트 */}
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">비행기 상태</h1>
        <div className="flex gap-8">
          {
            flightStateArr.map((fState) => {
              return (
                <button
                  className={`w-full py-12 ${fState === flightState ? 'bg-green-400' : 'bg-gray-300'}`}
                  key={`flight-${fState}`}
                  onClick={() => updateFlightState(fState)}
                >
                  {fState}
                </button>
              );
            })
          }
        </div>
      </div>

      {/* 기내식 구성 */}
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기내식 제공 시간</h2>
          <div className="flex gap-8">
            <button
              className={`w-full py-12 ${mealService ? "bg-green-400" : "bg-gray-400"}`}
              onClick={() => updateMealServiceStatus(true)}
              disabled={loading || mealService}
            >
              ON
            </button>
            <button
              className={`w-full py-12 ${!mealService ? "bg-green-400" : "bg-gray-400"}`}
              onClick={() => updateMealServiceStatus(false)}
              disabled={loading || !mealService}
            >
              OFF
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기내식 구성</h2>
          <p className="text-center">음식의 '제공 대상' 클릭 시 '승객'용 ↔ '직원'용 변경이 가능합니다.</p>
          <div className="flex flex-col">
            {/* 테이블 헤더 */}
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/6 text-center">음식 명</div>
              <div className="w-1/6 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/6 text-center">👍</div>
              <div className="w-1/6 text-center">👎</div>
              <div className="w-1/6 text-center">제공 대상</div>
            </div>
            {/* 데이터 출력 */}
            {flightFood.length > 0 ? (
              flightFood.map((food) => (
                <div
                  key={food.food_id}
                  className="flex gap-4 justify-between py-2 border-b-1 border-black"
                >
                  <div className="w-1/6 text-center">{food.food_name}</div>
                  <div className="w-1/6 text-center">{food.category}</div>
                  <div className="w-1/6 text-center">{food.food_count}</div>
                  <div className="w-1/6 text-center">{food.like_count}</div>
                  <div className="w-1/6 text-center">{food.hate_count}</div>
                  <div 
                    className="w-1/6 text-center hover:bg-white hover:cursor-pointer"
                    onClick={()=>{
                      const target = food.food_target === '승객' ? '직원' : '승객';
                      putAirplainMenu(flightNumber, food.food_id, target);
                    }}
                  >{food.food_target}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">데이터가 없습니다.</div>
            )}
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기장 기내식 선택</h2>
          {/* 테이블 헤더 */}
          <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
            <div className="w-1/6 text-center">음식 명</div>
            <div className="w-1/6 text-center">분류</div>
            <div className="w-1/6 text-center">재고</div>
            <div className="w-1/6 text-center">👍</div>
            <div className="w-1/6 text-center">👎</div>
            <div className="w-1/6 text-center">제공 대상</div>
          </div>
          {/* 데이터 출력 */}
          {captainFood.length > 0 ? (
            captainFood.map((food) => (
              <div
                key={food.food_id}
                className="flex gap-4 justify-between py-2 border-b-1 border-black hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => {
                  postAirplainMenu(flightNumber, food.food_id, captainId);
                }}
              >
                <div className="w-1/6 text-center">{food.food_name}</div>
                <div className="w-1/6 text-center">{food.category}</div>
                <div className="w-1/6 text-center">{food.food_count}</div>
                <div className="w-1/6 text-center">{food.like_count}</div>
                <div className="w-1/6 text-center">{food.hate_count}</div>
                <div className="w-1/6 text-center">{food.food_target}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
