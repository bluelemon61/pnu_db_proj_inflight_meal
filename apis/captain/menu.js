/**
 * 해당 메뉴의 제공 대상(승객용, 직원용)을 변경한다.
 * 
 * 권한: 기장(captain)
 * 
 * @param {number} flight_number 항공기 id
 * @param {number} food_id 음식 id
 * @param {string} food_target 제공할 대상 (승객, 직원)
 * @returns 
 */
export async function putAirplainMenu(flight_number, food_id, food_target) {
  const res = await fetch(`/api/captain/menu`, {
    method: 'PUT',
    body: JSON.stringify({
      flight_number,
      food_id,
      food_target,
    }),
  });

  if (res.status < 300) return true;

  alert(`비행기가 '착륙' 상태일 때만 제공 대상 변경이 가능합니다.`);
  return false;
}

/**
 * 기내식 목록을 불러온다. (기장용)
 * 
 * 권한: 기장(captain)
 * 
 * @param {number} flight_number 항공기 id
 * @param {string} food_target 제공할 대상 (승객, 직원)
 * @returns 
 */
export async function getAirplainMenu(flight_number, food_target) {
  const queryParameters = new URLSearchParams({
    flight_number, food_target
  }).toString();

  const res = await fetch(`/api/captain/menu?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}