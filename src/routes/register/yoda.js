export const queryUserName = async (userName) => {
  const data = JSON.stringify({
    query: `{checkuserByAttr(playerName:"${userName}"){exist}}`,
  });
  return fetch(import.meta.env.PUBLIC_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(async (res) => await res.json())
    .then((data) => data.data.checkuserByAttr.exist);
};

export const queryPhone = async (phone) => {
  const data = JSON.stringify({
    query: `{checkuserByAttr(agentName:"${
      import.meta.env.PUBLIC_MAIN_PARENT
    }",telephoneNo:"${phone}"){exist}}`,
  });
  return fetch(import.meta.env.PUBLIC_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(async (res) => await res.json())
    .then((data) => data.data.checkuserByAttr.exist);
};

export const queryBankAccountNo = async (accountNo) => {
  const data = JSON.stringify({
    query: `{checkuserByAttr(agentName:"${
      import.meta.env.PUBLIC_MAIN_PARENT
    }",accountNo:"${accountNo}"){exist}}`,
  });
  return fetch(import.meta.env.PUBLIC_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(async (res) => await res.json())
    .then((data) => data.data.checkuserByAttr.exist);
};
