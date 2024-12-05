"use client"

import { getAirplainStatus } from "@/apis/passenger/airplain";
import { getEaten } from "@/apis/passenger/eaten";
import { getAirplainMenuPassenger } from "@/apis/passenger/menu";
import { getSleep, postSleep } from "@/apis/passenger/sleep";
import { getReview, postReview}  from "@/apis/passenger/review"; 
import useInterval from "@/hooks/useInterval";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react"

export default function Passenger() {
  const seatNumber = parseInt(usePathname().split('/')[2]);

  const [flightNumber, setFlightNumber] = useState(100);

  const [foodList, setFoodList] = useState({});
  const [passengerState, setPassengerState] = useState(null);
  const [ordered, setOrdered] = useState(null);
  const [airplainStatus, setAirPlainStatus] = useState(null);
  const [eaten, setEaten] = useState(0);
  

  useEffect(() => {
    const menuFetcher = async () => {
      const menu = await getAirplainMenuPassenger(flightNumber);

      const newData = foodList;

      menu.forEach((food) => {
        if (newData[food.category] !== undefined) {
          newData[food.category].push(food);
        } else {
          newData[food.category] = [food];
        }
      });

      setFoodList({...newData});
    }

    const sleepFetcher = async () => {
      const data = await getSleep(flightNumber, seatNumber);
      setPassengerState(data[0].sleep_state);
    }

    menuFetcher();
    sleepFetcher();
  }, []);

  useInterval(() => {
    const airplainFetcher = async () => {
      const data = await getAirplainStatus(flightNumber);
      setAirPlainStatus(data[0]);
    }

    const eatenFetcher = async () => {
      const data = await getEaten(flightNumber, seatNumber);
      setEaten(data[0].eat_count)
    }

    airplainFetcher();
    eatenFetcher();
  }, 3000);

  const handleLike = async () => {
    if (!ordered) {
      return alert("주문한 음식이 없습니다.");
    }
  
    try {
      // 좋아요 요청 전송
      const response = await postReview(flightNumber, seatNumber, ordered.id, true);
  
      if (response.success) {
        alert("좋아요가 반영되었습니다.");
        // 업데이트된 리뷰 데이터를 가져옵니다.
        const updatedReview = await getReview(flightNumber, seatNumber, ordered.id);
        setOrdered({ ...ordered, like_count: updatedReview.data.like_count });
      } else {
        alert("좋아요 반영에 실패했습니다.");
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };
  
  const handleDislike = async () => {
    if (!ordered) {
      return alert("주문한 음식이 없습니다.");
    }
  
    try {
      // 싫어요 요청 전송
      const response = await postReview(flightNumber, seatNumber, ordered.id, false);
  
      if (response.success) {
        alert("싫어요가 반영되었습니다.");
        // 업데이트된 리뷰 데이터를 가져옵니다.
        const updatedReview = await getReview(flightNumber, seatNumber, ordered.id);
        setOrdered({ ...ordered, hate_count: updatedReview.data.hate_count });
      } else {
        alert("싫어요 반영에 실패했습니다.");
      }
    } catch (error) {
      console.error("싫어요 처리 중 오류:", error);
      alert("싫어요 처리 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    const sleepHandler = async () => {
      const data = await getSleep(flightNumber, seatNumber);
      const nowState = data[0].sleep_state;

      if (nowState !== passengerState)
        await postSleep(flightNumber, seatNumber, passengerState);
    }

    if (passengerState !== null) sleepHandler();
  }, [passengerState])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-black text-2xl">기내식</h1>
        <h1 className="font-bold text-xl">현재 좌석 - {seatNumber}</h1>
        <div className="flex flex-col bg-gray-300 p-8 gap-8">
          <h2 className="font-bold text-lg">주문</h2>
          <div className="flex flex-col gap-2 h-[520px] overflow-y-scroll">
            {
              Object.keys(foodList).map((category, idx) => {
                return (
                  <Fragment key={`${category}-${idx}`}>           
                    <h2 className="font-bold">{category}</h2>
                    <div className="grid grid-cols-4 gap-4">
                      {
                        foodList[category].map((food, i) => {
                          return (
                            <button
                              key={`${food.name}-${i}`}
                              className={`py-4 border-1 border-black ${ordered && ordered.id === food.id ? 'bg-green-400': 'bg-white' }`}
                              onClick={() => {
                                if (eaten)
                                  return alert('이미 식사를 완료하였습니다.');
                                if (ordered)
                                  return alert('이미 주문을 완료하였습니다.');
                                if (confirm(`${food.name} 주문하시겠습니까?\n주문 변경은 불가합니다.`))
                                  setOrdered(food);
                              }}
                            >
                              <p>{food.name}</p>
                              <p>👍+{food.like_count} 👎-{food.hate_count}</p>
                            </button>
                          )
                        })
                      }
                    </div>
                  </Fragment>
                )
              }) 
            }
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <p>식사 {eaten ? '완료' : '전'}</p>
              <p>비행기 상태 - {airplainStatus ? airplainStatus.flight_state : '로딩 중'}</p>
              <p>기내식 - {airplainStatus
                  ? airplainStatus.serve ? '제공 중' : '이용 불가'
                  : '로딩 중'
                }
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button 
                className={`w-40 py-2 border-1 border-black ${passengerState === 'NOTTOUCH' ? 'bg-green-400' : 'bg-white'}`}
                onClick={() => {
                  if (passengerState === 'NOTTOUCH')
                    setPassengerState('NORMAL');
                  else
                    setPassengerState('NOTTOUCH');
                }}
              >
                깨우지 마세요
              </button>
              <button 
                className={`w-40 py-2 border-1 border-black ${passengerState === 'AWAKEME' ? 'bg-green-400' : 'bg-white'}`}
                onClick={() => {
                  if (passengerState === 'AWAKEME')
                    setPassengerState('NORMAL');
                  else
                    setPassengerState('AWAKEME');
                }}
              >
                기내식 때<br/>깨워주세요
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 p-8 gap-8">
          <h2 className="font-bold text-lg">식사 메뉴 리뷰</h2>
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-center bg-white py-16 border-1 border-black">
              {
                ordered ?
                  <Fragment>
                    {ordered.category}<br/>{ordered.name}
                  </Fragment> : '주문한 음식이 없습니다.'
              }
            </div>
            {
              ordered
              ? <div className="flex justify-between gap-4">
                  <button className="w-full bg-white py-2 border-1 border-black" onClick={handleLike}>
                    좋아요 👍
                  </button>
                  <button className="w-full bg-white py-2 border-1 border-black" onClick={handleDislike}>
                    싫어요 👎
                  </button>
                </div>
              : undefined
            }
          </div>
        </div>
      </div>
    </div>
  )
}