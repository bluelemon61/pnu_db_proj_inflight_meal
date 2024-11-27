/**
 * 식사한 음식에 대한 리뷰를 작성한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} user_id 승객의 id
 * @param {number} food_order 주문한 음식 id
 * @param {boolean} is_like 종아요 여부 (true or false)
 * @returns 
 */
export async function postReview(flight_number, user_id, food_order, is_like) {
  const res = await fetch(`/api/passenger/review`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      user_id,
      food_order,
      is_like,
    }),
  });

  const data = await res.json();

  return data;
}

/**
 * 기내식의 리뷰를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} user_id 승객의 id
 * @param {number} food_id 음식 id
 * @returns 
 */
export async function getReview(flight_number, user_id, food_id) {
  const queryParameters = new URLSearchParams({
    flight_number, user_id, food_id
  }).toString();

  const res = await fetch(`/api/passenger/review?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!data) {
    return {
      user_id: 2,
      food_order: 1,
      category: '양식',
      name: '함박 스테이크',
      like_count: 4,
      hate_count: 6,
    }
  }

  return data;
}