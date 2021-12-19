import axios from "axios";

const returnHeader = (token) => {
  return {
    headers: {
      Authorization: `token ${token}`,
    },
  };
};

export async function getAllRepos(token) {
  const response = await axios.get(
    `https://api.github.com/user/repos`,
    returnHeader(token)
  );
  return response.data;
}

export async function getAllBranches(user, repo, token) {
  const response = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/branches`,
    returnHeader(token)
  );
  return response.data;
}

export async function getAllFiles(user, repo, branch, token) {
  const response = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`,
    returnHeader(token)
  );
  return response.data;
}
