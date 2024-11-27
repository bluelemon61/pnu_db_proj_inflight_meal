/**
 * 업체 제공 가능 기내식 목록에 기내식을 추가한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {string} category 음식 분류
 * @param {string} name 음식 명
 * @param {number} count 재고 개수
 * @returns 
 */
export async function postMenu(user_id, category, name, count) {
  const res = await fetch(`/api/provider/menu`, {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      category,
      name,
      count,
    }),
  });

  const data = await res.json();

  return data;
}

/**
 * 본인의 업체 제공 가능 기내식 목록을 불러온다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @returns 
 */
export async function getMenu(user_id) {
  const queryParameters = new URLSearchParams({
    user_id
  }).toString();

  const res = await fetch(`/api/provider/menu?${queryParameters}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!data) {
    return [
      {
        id: 1,
        category: '양식',
        name: '함박 스테이크',
        like_count: 4,
        hate_count: 6,
      },
      {
        id: 2,
        category: '샌드위치',
        name: '베이컨 햄 에그 샌드위치',
        like_count: 7,
        hate_count: 3,
      }
    ]
  }

  return data;
}

/**
 * 본인의 업체 제공 가능 기내식 목록에 있는
 * 기내식 재고를 수정한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {number} food_id 음식 id
 * @param {number} count 재고 개수
 * @returns 
 */
export async function putMenu(user_id, food_id, count) {
  const res = await fetch(`/api/provider/menu`, {
    method: 'PUT',
    body: JSON.stringify({
      user_id,
      food_id,
      count,
    }),
  });

  const data = await res.json();

  return data;
}

/**
 * 본인의 업체 제공 가능 기내식 목록에 있는
 * 기내식을 삭제한다.
 * 
 * 권한: 음식 제공 업체(provider)
 * 
 * @param {number} user_id 음식 제공 업체 유저 id
 * @param {number} food_id 음식 id
 * @returns 
 */
export async function deleteMenu(user_id, food_id) {
  const res = await fetch(`/api/provider/menu`, {
    method: 'DELETE',
    body: JSON.stringify({
      user_id,
      food_id
    }),
  });

  const data = await res.json();

  return data;
}