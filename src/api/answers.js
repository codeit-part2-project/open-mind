// 답변 생성
const postAnswer = async (questionId, postBody) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}questions/`;
  try {
    const response = await fetch(`${BASE_URL}${questionId}/answers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const answer = await response.json();
    return answer;
  } catch ({ message }) {
    return message;
  }
};

// 답변 조회
const getAnswer = async (answerId) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}answers/${answerId}/`;
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const answer = await response.json();
    return answer;
  } catch ({ message }) {
    return message;
  }
};

// 답변 삭제
const deleteAnswer = async (answerId) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}answers/`;
  try {
    const response = await fetch(`${BASE_URL}${answerId}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    return response;
  } catch ({ message }) {
    return message;
  }
};

// 답변 수정 PUT 메소드
const putAnswer = async (answerId, putBody) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}answers/`;
  try {
    const response = await fetch(`${BASE_URL}${answerId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putBody),
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const answer = await response.json();
    return answer;
  } catch ({ message }) {
    return message;
  }
};

// 답변 수정 PATCH 메소드
const patchAnswer = async (answerId, putBody) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}answers/`;
  try {
    const response = await fetch(`${BASE_URL}${answerId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putBody),
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const answer = await response.json();
    return answer;
  } catch ({ message }) {
    return message;
  }
};

export { postAnswer, getAnswer, deleteAnswer, putAnswer, patchAnswer };
