<template>
  <div id="app">
    <h1>
      Welcome to the Github Integration Portal
    </h1>
    <div class="container">
      <div class="item">
        <h3>Enter Username</h3>
        <input v-model="username" placeholder="username"/>
        <button v-on:click="getAllRepos({username})">
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
        <h3>Scroll</h3>
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
    }
  },
  methods : {
    getAllRepos(name) {
      console.log(name)
      getAllRepos(name).then(response => {
        this.repos.splice(0, this.repos.length)
        for(let i=0;i<response.length;i++) {
          this.repos.push({text :response[i].name, value: response[i].name});
        }
        console.log(this.repos)
        console.log(this.repos.repos)
      })
    },
    getAllBranches(name,repo) {
      getAllBranches(name,repo).then(response => {
        this.branches.splice(0, this.branches.length)
        for(let i=0;i<response.length;i++) {
          this.branches.push({text : response[i].name, value : response[i].name});
        }
        console.log(this.branches)
      })
    },
    getAllFiles(name,repo,branch) {
      getAllFiles(name,repo,branch).then(response => {
        
        this.files.splice(0,this.files.length)
        for(let i=0;i<response.tree.length;i++) {
          if(response.tree[i].path)
          this.files.push(response.tree[i].path);
        }
        console.log(this.files.length)
        this.numberOfFiles = this.files.length
        // console.log(this.files)
        console.log(this.numerOfFiles)
      })
    }
  }
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