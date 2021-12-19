<template>
  <div id="app">
    <h1>
      Welcome to the Github Integration Portal
    </h1>
    <div>
      <a href="https://github.com/login/oauth/authorize?client_id=5f223379fb1a42a8258e&scope=repo">
        Login with github
      </a>
    </div>
    <div class="container">
      <div class="item">
        <h3>Enter Username</h3>
        <input v-model="username" placeholder="username"/>
        <button v-on:click="getAllRepos()">
          Get All Repositories
        </button>
      </div>
      <section>
        <h3>{{username}}'s Repositories</h3>
        <b-form-radio-group style="text-align: left;" v-model="selectedRepo" :options="repos" class="mb-3" value-field="text" text-field="value" disabled-field="notEnabled"></b-form-radio-group>
        <div class="mt-3">Selected: <strong>{{ selectedRepo }}</strong></div>
        <button v-on:click="getAllBranches(username,selectedRepo)">
          get branches
        </button>
      </section>
      <section>
        <h3>Select Branch</h3>
        <b-form-radio-group v-model="selectedBranch" :options="branches" class="mb-3" value-field="text" text-field="value" disabled-field="notEnabled"></b-form-radio-group>
        <div class="mt-3">Selected: <strong>{{ selectedRepo }}</strong></div>
        <button v-on:click="getAllFiles(username,selectedRepo,selectedBranch)">
          get files
        </button>
      </section>
    </div>
    <section style="margin:2rem;">
      <h3>Number of Files: {{numberOfFiles}}</h3>
    </section>
  </div>
</template>

<script>
const axios = require('axios');
import {getAllRepos, getAllBranches, getAllFiles} from './service/UserService'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      username: "AnujSinghal12",
      usernameSet:0,
      repos: [],
      selectedRepo: "",
      reposSet:0,
      branches: [],
      branchesSet:0,
      files : [],
      numberOfFiles : "",
      access_token: ""
    }
  },
  methods : {
    getAllRepos() {
      // console.log(this.access_token)
      getAllRepos(this.access_token).then(response => {
        this.repos.splice(0, this.repos.length)
        for(let i=0;i<response.length;i++) {
          this.repos.push({text :response[i].name, value: response[i].name});
        }
        console.log(this.repos)
      })
    },
    getAllBranches(name,repo) {
      getAllBranches(name,repo,this.access_token).then(response => {
        this.branches.splice(0, this.branches.length)
        for(let i=0;i<response.length;i++) {
          this.branches.push({text : response[i].name, value : response[i].name});
        }
        console.log(this.branches)
      })
    },
    getAllFiles(name,repo,branch) {
      getAllFiles(name,repo,branch,this.access_token).then(response => {
        
        this.files.splice(0,this.files.length)
        for(let i=0;i<response.tree.length;i++) {
          if(response.tree[i].path)
          this.files.push(response.tree[i].path);
        }
        this.numberOfFiles = this.files.length
        console.log(this.numerOfFiles)
      })
    }
  },
  created() {
    // const accessToken = localStorage.getItem("access_token");
    // console.log(accessToken)
    
    // if(accessToken!==undefined) {
    //   console.log(accessToken,"thisisyo")
    //   this.access_token = accessToken;
    // }
    // else{
      const query = window.location.search.substring(1)
      console.log(query)
      const request_token = query.split('code=')[1]
      console.log(request_token)
      axios({
        method: 'get',
      url: `http://localhost:3000/temp?token=${request_token}`,
      }).then(response => {
        const accessToken = response.data.accessToken
        console.log(response.data)

        this.access_token = accessToken;

        //localStorage.setItem("access_token", accessToken);
      })
    }
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
section,
.item {
  background: #f3f3f3;
  padding: 16px 24px;
  margin-right: 24px;
  border-radius: 4px;
}

.container {
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
</style>