/**
 * 항공기 기내식 목록에 기내식을 추가한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {number} flight_number 항공편 id
 * @param {number} food_id 음식 id
 * @param {number} count 재고 개수
 * @returns 
 */
export async function postMenuOfFlight(user_id, flight_number, food_id, count) {
  const res = await fetch(`/api/provider/provide`, {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      flight_number,
      food_id,
      count,
    }),
  });

  if (res.status < 300) return true;
  return false;
}

/**
 * 항공기 기내식 목록을 불러온다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {number} flight_number 항공편 id
 * @returns 
 */
export async function getMenuOfFlight(user_id, flight_number) {
  const queryParameters = new URLSearchParams({
    user_id, flight_number
  }).toString();

  const res = await fetch(`/api/provider/provide?${queryParameters}`, {
    method: 'GET',
  });

  if ((await res.text()).length < 1) {
    return [
      {
        id: 1,
        category: '양식',
        name: '함박 스테이크',
        count: 3,
      },
      {
        id: 2,
        category: '샌드위치',
        name: '베이컨 햄 에그 샌드위치',
        count: 3,
      }
    ]
  }

  const data = await res.json();
  return data;
}

/**
 * 항공기 기내식 목록의 기내식 재고를 수정한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {number} flight_number 항공편 id
 * @param {number} food_id 음식 id
 * @param {number} count 재고 개수
 * @returns 
 */
export async function putMenuOfFlight(user_id, flight_number, food_id, count) {
  const res = await fetch(`/api/provider/provide`, {
    method: 'PUT',
    body: JSON.stringify({
      user_id,
      flight_number,
      food_id,
      count,
    }),
  });

  if (res.status < 300) return true;
  return false;
}

/**
 * 항공기 기내식 목록의 기내식 재고를 삭제한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {number} flight_number 항공편 id
 * @param {number} food_id 음식 id
 * @returns 
 */
export async function deleteMenuOfFlight(user_id, flight_number, food_id) {
  const res = await fetch(`/api/provider/provide`, {
    method: 'DELETE',
    body: JSON.stringify({
      user_id,
      flight_number,
      food_id
    }),
  });

  if (res.status < 300) return true;
  return false;
}