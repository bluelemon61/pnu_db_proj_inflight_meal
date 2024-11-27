/**
 * 기내식을 주문한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} food_id 음식 id
 * @param {number} user_id 승객의 id
 * @returns 
 */
export async function postOrder(flight_number, food_id, user_id) {
  const res = await fetch(`/api/passenger/order`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      food_id,
      user_id,
    }),
  });

  const data = await res.json();

  return data;
}

/**
 * 주문한 기내식 정보를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} user_id 승객의 id
 * @returns 
 */
export async function getOrder(flight_number, user_id) {
  const queryParameters = new URLSearchParams({
    flight_number, user_id
  }).toString();

  const res = await fetch(`/api/passenger/order?${queryParameters}`, {
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