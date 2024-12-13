const BASE_URL = `${process.env.REACT_APP_BASE_URL}subjects/`;

const getSubject = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${BASE_URL}?${query}`);
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const subject = await response.json();
    return subject;
  } catch ({ message }) {
    return message;
  }
};

const getSubjectById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}${id}/`);
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const subject = await response.json();
    return subject;
  } catch ({ message }) {
    return message;
  }
};

const postSubject = async (postBody) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    if (!response.ok) {
      throw new Error(`에러코드 : ${response.status}`);
    }
    const subject = await response.json();
    return subject;
  } catch ({ message }) {
    return message;
  }
};

const deleteSubject = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}${id}/`, {
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

export { getSubject, getSubjectById, postSubject, deleteSubject };
