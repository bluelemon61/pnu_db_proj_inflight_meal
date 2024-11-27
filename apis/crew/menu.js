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

  const data = await res.json();

  return data;
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