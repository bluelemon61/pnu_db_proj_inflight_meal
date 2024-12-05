"use client"

import { deleteMenu, getMenu, postMenu } from "@/apis/provider/menu";
import { deleteMenuOfFlight, getMenuOfFlight, postMenuOfFlight, putMenuOfFlight } from "@/apis/provider/provide";
import interval from "@/constants/interval";
import useInterval from "@/hooks/useInterval";
import { useState } from "react"

export default function Provider() {
  const [flightNumber, setFlightNumber] = useState(100);
  const [providerId, setProviderId] = useState(2);

  const [provideList, setProvideList] = useState([]);
  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
  });

  const [flightList, setFlightList] = useState([]);
  const [newCounts, setNewCounts] = useState([]);

  useInterval(() => {
    const provideListFetcher = async () => {
      const data = await getMenu(providerId);
      setProvideList(data);
    }

    const flightListFetcher = async () => {
      const data = await getMenuOfFlight(providerId, flightNumber);
      setFlightList(data);
    }

    provideListFetcher();
    flightListFetcher();
  }, interval);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식 구성</h1>
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">업체 제공 가능 기내식 목록</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/4 text-center">음식 명</div>
              <div className="w-1/4 text-center">분류</div>
              <div className="w-1/4 text-center">👍</div>
              <div className="w-1/4 text-center">👎</div>
              <div className="w-1/4 text-center">삭제</div>
            </div>
            {
              provideList.map((food) => {
                return (
                  <div 
                    className="flex gap-4 justify-between py-2 border-b-1 border-black"
                    key={`food-${food.id}`}
                  >
                    <div 
                      className="w-1/4 text-center hover:bg-white hover:cursor-pointer"
                      onClick={async () => {
                        const result = await postMenuOfFlight(providerId, flightNumber, food.id, 0);
                        if (result) alert('성공적으로 추가되었습니다.');
                      }}
                    >
                      {food.name}
                    </div>
                    <div className="w-1/4 text-center">{food.category}</div>
                    <div className="w-1/4 text-center">{food.like_count}</div>
                    <div className="w-1/4 text-center">{food.hate_count}</div>
                    <div className="w-1/4 text-center">
                      <button
                        className="bg-red-500 py-1 px-4 text-white"
                        onClick={async () => {
                          const result = await deleteMenu(providerId, food.id);
                          if (result) alert('제공 가능 기내식 목록에서 삭제되었습니다.');
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )
              })
            }
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/4 text-center">
                <input 
                  value={newFood.name}
                  onChange={(e) => {
                    setNewFood({
                      ...newFood,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-1/4 text-center">
                <input 
                  value={newFood.category}
                  onChange={(e) => {
                    setNewFood({
                      ...newFood,
                      category: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-1/4 text-center">
                <button 
                  className="bg-red-300 py-1 px-4"
                  onClick={() => {
                    setNewFood({
                      name: '',
                      category: '',
                    });
                  }}
                >
                  초기화
                </button>
              </div>
              <div className="w-1/4 text-center">
                <button 
                  className="bg-green-300 py-1 px-4"
                  onClick={async () => {
                    const result = await postMenu(providerId, newFood.category, newFood.name);
                    if (result) {
                      alert('음식이 추가 되었습니다');
                      setNewFood({
                        name: '',
                        category: '',
                      });
                    }
                  }}
                >
                  추가
                </button>
              </div>
              <div className="w-1/4 text-center"></div>
            </div>
            <div className="p-4 self-center text-center text-lg">
              ⬇️ 음식 이름 클릭 시 비행기에 기내식이 추가됩니다. ⬇️
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col bg-gray-300 p-8">
          <h2 className="font-bold text-lg">비행기 제공</h2>
          <h2 className="font-bold text-normal">부산대항공-{flightNumber}</h2>
          <div className="flex flex-col">
            <div className="flex gap-4 justify-between py-2 border-b-2 border-black">
              <div className="w-1/4 text-center">음식 명</div>
              <div className="w-1/4 text-center">분류</div>
              <div className="w-1/4 text-center">재고</div>
              <div className="w-1/4 text-center">재고 변경</div>
              <div className="w-1/4 text-center">삭제</div>
            </div>
            {
              flightList.map((food, idx) => {
                return (
                  <div className="flex gap-4 justify-between py-2 border-b-1 border-black" key={`flightFood-${food.id}`}>
                    <div className="w-1/4 text-center">{food.name}</div>
                    <div className="w-1/4 text-center">{food.category}</div>
                    <div className="w-1/4 text-center">{food.food_count}</div>
                    <div className="w-1/4 text-center flex justify-center gap-2">
                      <input 
                        type="number" 
                        className="w-20 text-right"
                        id={`count-${food.id}`}
                      />
                      <button 
                        className="bg-blue-300 py-1 px-4"
                        onClick={async () => {
                          const count = parseInt(document.getElementById(`count-${food.id}`).value);
                          if (!isNaN(count)){
                            const result = await putMenuOfFlight(providerId, flightNumber, food.food_id, count);
                            if (result) alert('재고 변경이 반영되었습니다.');
                          }
                        }}
                      >
                        반영
                      </button>
                    </div>
                    <div className="w-1/4 text-center">
                      <button
                        className="bg-red-500 py-1 px-4 text-white"
                        onClick={async () => {
                          const result = await deleteMenuOfFlight(providerId, flightNumber, food.food_id);
                          if (result) alert('비행기 재고에서 삭제되었습니다.');
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}