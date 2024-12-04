/**
 * 기내식을 제공한다. 승무원 본인이 기내식을 먹는 경우도 이용된다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} food_id 음식 id
 * @param {number} user_id 승객(승무원)의 id
 * @returns 
 */
export async function postAirplainMenu(flight_number, food_id, user_id) {
  const res = await fetch(`/api/crew/menu`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      food_id,
      user_id,
    }),
  });

  if (res.status == 200) {
    return true;
  }

  return false;
}

/**
 * 기내식 목록을 불러온다. (승무원용)
 * 
 * 권한: 승무원(crew)
 * 
 * @param {number} flight_number 항공기 id
 * @param {string} food_target 제공할 대상 (승객, 직원)
 * @returns 
 */
export async function getAirplainMenu(flight_number, food_target) {
  const queryParameters = new URLSearchParams({
    flight_number, food_target
  }).toString();

  const res = await fetch(`/api/crew/menu?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}