import axios from "axios";
// const axios = require("axios");

export async function getAllRepos(user) {
  console.log(user.username);
  const response = await axios.get(
    `https://api.github.com/users/${user.username}/repos`
  );
  return response.data;
}

export async function getAllBranches(user, repo) {
  const response = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/branches`
  );
  return response.data;
}

export async function getAllFiles(user, repo, branch) {
  const response = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
  );
  return response.data;
}
