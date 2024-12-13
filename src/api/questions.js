// 질문 생성
const postQuestion = async (id, postBody) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}subjects/`;
  try {
    const response = await fetch(`${BASE_URL}${id}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const question = await response.json();
    return question;
  } catch ({ message }) {
    return message;
  }
};

// 대상 질문 목록 조회
const getQuestionBySubjectId = async (subjectId, params) => {
  const query = new URLSearchParams(params).toString();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}subjects/`;
  try {
    const response = await fetch(`${BASE_URL}${subjectId}/questions/?${query}`);
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const question = await response.json();
    return question;
  } catch ({ message }) {
    return message;
  }
};

// 질문 조회
const getQuestionByQuestionId = async (questionId) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}questions/`;
  try {
    const response = await fetch(`${BASE_URL}${questionId}/`);
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const question = await response.json();
    return question;
  } catch ({ message }) {
    return message;
  }
};

// 질문 삭제
const deleteQuestion = async (questionId) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}questions/`;
  try {
    const response = await fetch(`${BASE_URL}${questionId}/`, {
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

// 질문 리액션 달기
const postReaction = async (questionId, postBody) => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}questions/`;
  try {
    const response = await fetch(`${BASE_URL}${questionId}/reaction/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const reaction = await response.json();
    return reaction;
  } catch ({ message }) {
    return message;
  }
};

export { postQuestion, getQuestionBySubjectId, getQuestionByQuestionId, deleteQuestion, postReaction };
