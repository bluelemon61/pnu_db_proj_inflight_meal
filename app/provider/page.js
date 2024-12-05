"use client"

import { getMenu, postMenu } from "@/apis/provider/menu";
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

  useInterval(() => {
    const provideListFetcher = async () => {
      const data = await getMenu(providerId);
      setProvideList(data);
    }

    provideListFetcher();
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
            </div>
            {
              provideList.map((food) => {
                return (
                  <div className="flex gap-4 justify-between py-2 border-b-1 border-black" key={`food-${food.id}`}>
                    <div className="w-1/4 text-center">{food.name}</div>
                    <div className="w-1/4 text-center">{food.category}</div>
                    <div className="w-1/4 text-center">{food.like_count}</div>
                    <div className="w-1/4 text-center">{food.hate_count}</div>
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
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/4 text-center">닭다리살 포케</div>
              <div className="w-1/4 text-center">포케</div>
              <div className="w-1/4 text-center">10</div>
              <div className="w-1/4 text-center flex justify-center gap-2">
                <input type="number" className="w-20 text-right"/>
                <button className="bg-blue-300 py-1 px-4">반영</button>
              </div>
            </div>
            <div className="flex gap-4 justify-between py-2 border-b-1 border-black">
              <div className="w-1/4 text-center">
                <input />
              </div>
              <div className="w-1/4 text-center">
                <input />
              </div>
              <div className="w-1/4 text-center">
                <input type="number"/>
              </div>
              <div className="w-1/4 text-center flex justify-center gap-2">
                <button className="bg-red-300 py-1 px-4">초기화</button>
                <button className="bg-green-300 py-1 px-4">추가</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}