"use client";

import { getEatStatus } from "@/apis/crew/eat-check";
import { getAirplainMenu, postAirplainMenu } from "@/apis/crew/menu";
import { getSleepStatus } from "@/apis/crew/sleep-check";
import { getAirplainStatus } from "@/apis/crew/status";
import interval from "@/constants/interval";
import useInterval from "@/hooks/useInterval";
import { Fragment, useState } from "react";

export default function Crew() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(4);
  const [flightState, setFlightState] = useState("로딩 중..."); // 비행기 상태
  const [mealService, setMealService] = useState("로딩 중..."); // 기내식 제공 상태
  const [crewFood, setCrewFood] = useState([]); //승무원 기내식 데이터
  const [passFood, setPassFood] = useState([]); //승객 기내식 데이터
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 음식
  const [passEat, setPassEat] = useState([]); // 승객 식사 상태
  const [passSleep, setPassSleep] = useState([]); // 승객 수면 상태

  const [flightNumber, setFlightNumber] = useState(100);
  const [crewId, setCrewId] = useState(2);


  useInterval(() => {
    const flightGetter = async () => {
      const flightData = await getAirplainStatus(flightNumber);
      setFlightState(flightData.flight_state || "알 수 없음");
      setMealService(flightData.serve ? "제공 가능" : "제공 불가");
    }

    const menuGetter = async () => {
      const pass = await getAirplainMenu(flightNumber, '승객');
      setPassFood(pass);

      const crew = await getAirplainMenu(flightNumber, '기장');
      setCrewFood(crew);
    }

    const passGetter = async () => {
      const passEatData = await getEatStatus(flightNumber);
      const sortedPassEat = passEatData.sort((a,b) => a.seat_number - b.seat_number);
      setPassEat(sortedPassEat);

      const passSleepData = await getSleepStatus(flightNumber);
      const sortedPassSleep = passSleepData.sort((a,b) => a.seat_number - b.seat_number);
      setPassSleep(sortedPassSleep);

    }

    flightGetter();
    menuGetter();
    passGetter();
  }, interval);

  return (
    <div className="flex flex-col gap-8 w-crew">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">대시보드</h1>
        <div className="relative flex flex-col items-center">
          <div className="absolute left-0 p-4 bg-white/70 border-1">
            <p>비행기 상태 - {flightState}</p>
            <p>기내식 - {mealService}</p>
          </div>
          {
            selectedFood == null 
            ? <div className="absolute right-0 flex flex-col items-end gap-2">
                <div className="flex gap-2 items-center">
                  <p>식사 완료</p>
                  <button className={`p-6 bg-eaten`} />
                </div>
                <div className="flex gap-2 items-center">
                  <p>식사 전, 깨어 있어요</p>
                  <button className={`p-6 bg-normal`} />
                </div>
                <div className="flex gap-2 items-center">
                  <p>식사 전, 깨우지 마세요</p>
                  <button className={`p-6 bg-nottouch`} />
                </div>
                <div className="flex gap-2 items-center">
                  <p>식사 전, 기내식 때 깨워주세요</p>
                  <button className={`p-6 bg-awakeme`} />
                </div>
              </div>
            : <div className="absolute right-0 flex flex-col items-end gap-2">
                <div className="flex gap-2 items-center">
                  <p>'{selectedFood.food_name}' 원하지 않음 or 식사 완료</p>
                  <button className={`p-6 bg-gray-500`} />
                </div>
                <div className="flex gap-2 items-center">
                  <p>식사 전, 깨어 있어요</p>
                  <button className={`p-6 bg-normal`} />
                </div>
                <div className="flex gap-2 items-center">
                  <p>식사 전, 깨우지 마세요</p>
                  <button className={`p-6 bg-nottouch`} />
                </div>
                <div className="flex gap-2 items-center">
                  <p>식사 전, 기내식 때 깨워주세요</p>
                  <button className={`p-6 bg-awakeme`} />
                </div>
              </div>
          }
          
          <div className="px-8 py-24 bg-gray-200" />
          <div className="flex gap-12 bg-gray-200 px-36 py-16 rounded-airplain">
            {Array.from({ length: rows }).map((_, r) => (
              <Fragment key={r}>
                {r === Math.ceil(rows / 2) ? <div className="px-8" /> : null}
                <div className="flex flex-col gap-4">
                  {Array.from({ length: cols }).map((_, c) => (
                    <Fragment key={`col${c}`}>
                      {c === cols / 2? <div className="py-4" /> : null}
                      <button
                        className={`p-6 ${
                          selectedFood
                            ? passSleep[r*cols+c] !== undefined && passEat[r*cols+c] !== undefined
                              ? passEat[r*cols+c].eat_count > 0 || selectedFood.id !== passEat[r*cols+c].food_order
                                ? `bg-gray-500`
                                : `bg-${passSleep[r*cols+c].sleep_state.toLowerCase()}`
                              : `bg-gray-500`
                            : passSleep[r*cols+c] !== undefined && passEat[r*cols+c] !== undefined
                              ? passEat[r*cols+c].eat_count > 0
                                ? `bg-eaten`
                                : `bg-${passSleep[r*cols+c].sleep_state.toLowerCase()}`
                              : `bg-gray-500`
                        }`}
                        onClick={async () => {
                          if (selectedFood) {
                            const seatNumber = r*cols + c + 1;
                            if (mealService === '제공 불가') 
                              return alert('기내식 제공이 불가합니다.');
                            if (selectedFood.id !== passEat[seatNumber - 1].food_order)
                              return alert(`'${selectedFood.food_name}' 주문하지 않은 승객입니다.`);
                            if (passSleep[seatNumber - 1].sleep_state.toLowerCase() === 'nottouch')
                              return alert(`승객이 일어난 후 제공하세요.`);
                            const result = await postAirplainMenu(flightNumber, selectedFood.food_id, passEat[seatNumber - 1].user_id);
                            if (!result) alert('음식 제공에 실패하였습니다.');
                          }
                        }}
                      >
                        {r*cols + c + 1}
                      </button>                        
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="px-8 py-24 bg-gray-200" />
          {
            selectedFood
            ? <div className="absolute w-full flex p-4 border-2 left-0 bottom-24 gap-4 bg-white/80 justify-center">
                '{selectedFood.food_name}' 을/를 주문한 승객을 표시합니다.<br/>좌석 클릭 시 기내식을 제공할 수 있습니다.
              </div>
            : undefined
          }
          <div className="absolute w-full flex left-0 bottom-0 gap-4">
            <div className="w-1/6 py-8 bg-sky-400 text-white text-center">
              기내식 메뉴
            </div>
            <button className="px-2 py-8 bg-white border-1 border-black">&lt;</button>
            <div className="w-full flex gap-2">
              {passFood.map((food) => (
                <button
                  key={food.id}
                  className={`px-6 bg-white border-1 border-black ${
                    selectedFood && selectedFood.id === food.id ? "bg-yellow-300" : ""
                  }`}
                  onClick={() => {
                    if (selectedFood && selectedFood.id === food.id) setSelectedFood(null);
                    else setSelectedFood(food);
                  }}
                >
                  <p>
                    {food.food_name}
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
                  className="flex gap-4 justify-between py-2 border-b-1 border-black hover:bg-gray-200 hover:cursor-pointer"
                  onClick={()=>{
                    postAirplainMenu(flightNumber, food.food_id, crewId)
                  }}
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
            {
              crewFood.length > 0 ? (
                crewFood.map((foodObj) => {
                  return (
                    <div 
                      className="flex gap-4 justify-between py-2 border-b-1 border-black"
                      key={`crew${foodObj.food_id}`}
                    >
                      <div className="w-1/5 text-center">{foodObj.food_name}</div>
                      <div className="w-1/5 text-center">{foodObj.category}</div>
                      <div className="w-1/6 text-center">{foodObj.food_count}</div>
                      <div className="w-1/5 text-center">{foodObj.like_count}</div>
                      <div className="w-1/5 text-center">{foodObj.hate_count}</div>
                      <div className="w-1/5 text-center">{foodObj.food_target}</div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-4">기내식 데이터가 없습니다.</div>
              )
            }
            {
              passFood.map((foodObj) => {
                return (
                  <div 
                    className="flex gap-4 justify-between py-2 border-b-1 border-black"
                    key={`pass${foodObj.food_id}`}
                  >
                    <div className="w-1/5 text-center">{foodObj.food_name}</div>
                    <div className="w-1/5 text-center">{foodObj.category}</div>
                    <div className="w-1/6 text-center">{foodObj.food_count}</div>
                    <div className="w-1/5 text-center">{foodObj.like_count}</div>
                    <div className="w-1/5 text-center">{foodObj.hate_count}</div>
                    <div className="w-1/5 text-center">{foodObj.food_target}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
