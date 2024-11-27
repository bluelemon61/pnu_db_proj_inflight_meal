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
export async function postAirplainMenu(flight_number, food_id, food_target) {
  const res = await fetch(`/api/captain/menu`, {
    method: 'POST',
    body: JSON.stringify({
      flight_number,
      food_id,
      food_target,
    }),
  });

  const data = await res.json();

  return data;
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

  if (!data) {
    return [
      {
        id: 1,
        food_count: 3,
        food_target: '승객',
        category: '양식',
        name: '함박 스테이크',
        like_count: 4,
        hate_count: 6,
      },
      {
        id: 2,
        food_count: 5,
        food_target: '직원',
        category: '샌드위치',
        name: '베이컨 햄 에그 샌드위치',
        like_count: 7,
        hate_count: 3,
      }
    ]
  }

  return data;
}