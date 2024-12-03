"use client";

import { useState, useEffect } from "react";

export default function Captain() {
  const [flightFood, setFlightFood] = useState([]); // 기내식 데이터 상태 관리
  const [mealService, setMealService] = useState(false); // 기내식 제공 시간 상태

  // 비행 상태 업데이트 함수
  async function updateFlightState(state) {
    try {
      const response = await fetch("/api/captain/airplain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flight_number: 100, // 업데이트할 비행기의 번호
          flight_state: state, // 업데이트할 상태
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`비행 상태가 '${state}'로 업데이트되었습니다.`);
      } else {
        alert(`업데이트 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating flight state:", error);
      alert("비행 상태 업데이트 중 오류가 발생했습니다.");
    }
  }

  // 기내식 데이터 가져오는 함수
  async function fetchFlightFood() {
    try {
      const response = await fetch("/api/captain/menu?flight_number=100"); // API 호출
      const data = await response.json();
      setFlightFood(data); // 상태 업데이트
      console.log("Fetched flight food:", data); // 확인용 로그
    } catch (error) {
      console.error("Error fetching flight food data:", error);
    }
  }

  // 기내식 제공 시간 토글 함수
  function toggleMealService(status) {
    setMealService(status);
    alert(`기내식 제공이 ${status ? "시작" : "중단"}되었습니다.`);
  }

  useEffect(() => {
    fetchFlightFood(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* 비행기 상태 업데이트 */}
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">비행기 상태</h1>
        <div className="flex gap-8">
          <button
            className="w-full py-12 bg-gray-300"
            onClick={() => updateFlightState("이륙")}
          >
            이륙
          </button>
          <button
            className="w-full py-12 bg-gray-300"
            onClick={() => updateFlightState("정상운행")}
          >
            정상 운행
          </button>
          <button
            className="w-full py-12 bg-gray-300"
            onClick={() => updateFlightState("난기류")}
          >
            난기류
          </button>
          <button
            className="w-full py-12 bg-gray-300"
            onClick={() => updateFlightState("비상상황")}
          >
            비상 상황
          </button>
          <button
            className="w-full py-12 bg-gray-300"
            onClick={() => updateFlightState("착륙")}
          >
            착륙
          </button>
        </div>
      </div>

      {/* 기내식 구성 */}
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기내식 제공 시간</h2>
          <div className="flex gap-8">
            <button
              className={`w-full py-12 ${mealService ? "bg-gray-400" : "bg-gray-100"}`}
              onClick={() => toggleMealService(true)}
            >
              ON
            </button>
            <button
              className={`w-full py-12 ${!mealService ? "bg-gray-400" : "bg-gray-100"}`}
              onClick={() => toggleMealService(false)}
            >
              OFF
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">기내식 구성</h2>
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
                  <div className="w-1/6 text-center">{food.food_target}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
