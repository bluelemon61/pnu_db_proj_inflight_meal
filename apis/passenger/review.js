/**
 * 식사한 음식에 대한 리뷰를 작성한다.
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} seat_number 승객의 좌석 번호
 * @param {number} food_order 주문한 음식 id
 * @param {boolean} is_like 종아요 여부 (true or false)
 * @returns 
 */
export async function postReview(flight_number, seat_number, food_order, is_like) {
  const res = await fetch(`/api/passenger/review`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      seat_number,
      food_order,
      is_like,
    }),
  });

  if (res.status < 300) return true;

  alert('이미 리뷰를 남겼습니다.');
  return false;
}

/**
 * 기내식의 리뷰를 불러온다. (승객용)
 * 
 * 권한: 승객(passenger)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} user_id 승객의 id
 * @param {number} food_id 음식 id
 * @param {boolean} is_like 선호 여부
 * @returns 
 */
export async function getReview(flight_number, user_id, food_id) {
  const queryParameters = new URLSearchParams({
    flight_number, user_id, food_id , is_like
  }).toString();

  const res = await fetch(`/api/passenger/review?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}