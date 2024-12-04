"use client";

import { Fragment, useState, useEffect } from "react";

export default function Crew() {
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(4);
  const [flightState, setFlightState] = useState("로딩 중..."); // 비행기 상태
  const [mealService, setMealService] = useState("로딩 중..."); // 기내식 제공 상태
  const [crewFood, setCrewFood] = useState([]); //승무원 기내식 데이터
  const [passFood, setPassFood] = useState([]); //승객 기내식 데이터
  const [selectedSeat, setSelectedSeat] = useState(null); // 선택된 좌석
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 음식

  // 비행기 상태 및 기내식 제공 여부 가져오기
  async function fetchFlightData() {
    try {
      const response = await fetch("/api/crew/status?flight_number=100");
      const data = await response.json();

      if (data.success) {
        setFlightState(data.flight_state || "알 수 없음");
        setMealService(data.serve ? "제공 가능" : "제공 불가");
      } else {
        console.error("Failed to fetch flight data:", data.message);
        setFlightState("데이터 없음");
        setMealService("데이터 없음");
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setFlightState("오류 발생");
      setMealService("오류 발생");
    }
  }

  async function fetchcrewFood() {
    try {
      const response = await fetch("/api/crew/menu?flight_number=100&food_target=기장"); // API 호출
      const data = await response.json();
      setCrewFood(data); // 상태 업데이트
      console.log("Fetched flight food:", data); // 확인용 로그
    } catch (error) {
      console.error("Error fetching flight food data:", error);
    }
  }

  async function fetchPassFood() {
    try {
      const response = await fetch("/api/crew/menu?flight_number=100&food_target=승객"); // API 호출
      const data = await response.json();
      setPassFood(data); // 상태 업데이트
      console.log("Fetched Passenger flight food:", data); // 확인용 로그
    } catch (error) {
      console.error("Error fetching flight food data:", error);
    }
  }

  async function handleProvideMeal() {
    if (!selectedSeat || !selectedFood) {
      alert("좌석과 음식을 선택하세요!");
      return;
    }

    try {
      const response = await fetch("/api/crew/eat-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food_id: selectedFood.food_id,
          flight_number: 100,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("기내식이 성공적으로 제공되었습니다!");
        fetchPassFood(); // 재고 업데이트를 위해 다시 데이터 가져오기
      } else {
        alert(result.message || "기내식 제공에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error providing meal:", error);
      alert("기내식 제공 중 오류가 발생했습니다.");
    }
  }


  useEffect(() => {
    fetchFlightData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    fetchcrewFood();
    fetchPassFood();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-crew">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">대시보드</h1>
        <div className="relative flex flex-col items-center">
          <div className="absolute left-0">
            <p>비행기 상태 - {flightState}</p>
            <p>기내식 - {mealService}</p>
          </div>
          <div className="px-8 py-24 bg-gray-200" />
          <div className="flex gap-12 bg-gray-200 px-36 py-16 rounded-airplain">
            {Array.from({ length: rows }).map((_, r) => (
              <Fragment key={r}>
                {r === rows / 2 ? (
                  <div className="px-8" />
                ) : (
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: cols }).map((_, c) => (
                      <Fragment key={`col${c}`}>
                        {c === cols / 2 ? <div className="py-4" /> : null}
                        <button
                          className={`p-6 ${
                            selectedSeat === `${r}-${c}` ? "bg-blue-500" : "bg-green-500"
                          }`}
                          onClick={() => setSelectedSeat(`${r}-${c}`)}
                        />
                      </Fragment>
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="px-8 py-24 bg-gray-200" />
          <div className="absolute w-full flex left-0 bottom-0 gap-4">
            <button
              className="w-1/6 py-8 bg-sky-400 text-white"
              onClick={handleProvideMeal}
              disabled={!selectedFood || !selectedSeat}
            >
              기내식 제공하기
            </button>
            <button className="px-2 py-8 bg-white border-1 border-black">&lt;</button>
            <div className="w-full flex gap-2">
              {passFood.map((food) => (
                <button
                  key={food.food_id}
                  className={`px-6 bg-white border-1 border-black ${
                    selectedFood?.food_id === food.food_id ? "bg-yellow-300" : ""
                  }`}
                  onClick={() => setSelectedFood(food)}
                >
                  <p>
                    {food.food_name} - {food.food_count}명
                  </p>
                  <p>재고 {food.food_count}개</p>
                </button>
              ))}
            </div>
            <button className="px-2 bg-white border-1 border-black">&gt;</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">승무원 기내식 선택</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/5 text-center">음식 명</div>
              <div className="w-1/5 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/5 text-center">👍</div>
              <div className="w-1/5 text-center">👎</div>
              <div className="w-1/5 text-center">제공 대상</div>
            </div>

            {/* 테이블 데이터 */}
            {crewFood.length > 0 ? (
              crewFood.map((food) => (
                <div
                  key={food.food_id}
                  className="flex gap-4 justify-between py-2 border-b-1 border-black"
                >
                  <div className="w-1/5 text-center">{food.food_name}</div>
                  <div className="w-1/5 text-center">{food.category}</div>
                  <div className="w-1/6 text-center">{food.food_count}</div>
                  <div className="w-1/5 text-center">{food.like_count}</div>
                  <div className="w-1/5 text-center">{food.hate_count}</div>
                  <div className="w-1/5 text-center">{food.food_target}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">기내식 데이터가 없습니다.</div>
            )}
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">재고 확인</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/5 text-center">음식 명</div>
              <div className="w-1/5 text-center">분류</div>
              <div className="w-1/6 text-center">재고</div>
              <div className="w-1/5 text-center">👍</div>
              <div className="w-1/5 text-center">👎</div>
              <div className="w-1/5 text-center">제공 대상</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">닭다리살 포케</div>
              <div className="w-1/5 text-center">포케</div>
              <div className="w-1/6 text-center">10</div>
              <div className="w-1/5 text-center">5</div>
              <div className="w-1/5 text-center">3</div>
              <div className="w-1/5 text-center">직원</div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/5 text-center">함박스테이크</div>
              <div className="w-1/5 text-center">양식</div>
              <div className="w-1/6 text-center">3</div>
              <div className="w-1/5 text-center">5</div>
              <div className="w-1/5 text-center">3</div>
              <div className="w-1/5 text-center">승객</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
