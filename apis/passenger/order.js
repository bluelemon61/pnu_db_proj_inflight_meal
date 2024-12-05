/**
 * 기내식을 주문한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} food_id 음식 id
 * @param {number} seat_number 승객의 좌석 번호
 * @returns 
 */
export async function postOrder(flight_number, food_id, seat_number) {
  const res = await fetch(`/api/passenger/order`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      food_id,
      seat_number,
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
 * @param {number} seat_number 좌석 번호
 * @returns 
 */
export async function getOrder(flight_number, seat_number) {
  const queryParameters = new URLSearchParams({
    flight_number, seat_number
  }).toString();

  const res = await fetch(`/api/passenger/order?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data.data;
}