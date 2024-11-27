/**
 * 승객들의 식사 상태를 확인한다.
 * 
 * 권한: 승무원(crew)
 * 
 * @param {number} flight_number 항공기 id
 * @returns 
 */
export async function getEatStatus(flight_number) {
  const queryParameters = new URLSearchParams({
    flight_number
  }).toString();

  const res = await fetch(`/api/crew/eat-check?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!data) {
    return [
      {
        user_id: 1,
        eat_count: 0,
        seat_number: 1,
        food_order: 1,
      },
      {
        user_id: 2,
        eat_count: 1,
        seat_number: 2,
        food_order: null,
      },
      {
        user_id: 3,
        eat_count: 1,
        seat_number: 3,
        food_order: null,
      },
      {
        user_id: 4,
        eat_count: 0,
        seat_number: 4,
        food_order: 1,
      },
    ]
  }

  return data;
}