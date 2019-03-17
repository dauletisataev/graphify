<template>
  <div class="hello">

    <div class="wrap">
      <div class="search">
          <input type="text" class="searchTerm" placeholder="Search">
          <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
    <button @click="$router.push('/new-graph')" class="create_new">Создать новый граф</button>   

    <div class="holder">
      

      <!-- <form @submit.prevent="addSkill">
        <input type="text" placeholder="Введите вопрос" v-model="skill" v-validate="'min:5'" name="skill">

        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>
        </transition>
      </form> -->

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in nodes" :key='index'>
            {{ data.node }}
            
          </li>
        </transition-group>
      </ul>

      <!-- <p>These are the skills that you possess.</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      node: '',
      nodes: [
        { "node": "В какой стране ты учишься?"},
        { "node": "Какой климат у вас в городе?"}
      ]
    }
  },
  methods: {
    addSkill() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.skills.push({skill: this.skill})
          this.skill = '';
        } else {
          console.log('Not valid');
        }
      })
    },
    remove(id) {
      this.skills.splice(id,1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 

.hello{
  align-content: center;
}

  .holder {
    background: #fff;
    width: 800px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

  

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

i {
  float:right;
  cursor:pointer;
}

.search {
  display: inline;
  position: relative;
}

.searchTerm {
  background: #fff;
  float: left;
  width: 100%;
  border: 3px solid #bdbdbd;
  padding: 5px;
  height: 46px;
  border-radius: 5px;
  outline: none;
  color: #9DBFAF;
  font-size: 18px;
}

.searchTerm:focus{
  color: #bdbdbd;
}

.searchButton {
  position: absolute;  
  right: 0px;
  width: 56px;
  height: 46px;
  border: 1px solid #bdbdbd;
  background: #bdbdbd;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  padding-inline-end: 12px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.create_new {
  position: relative;
  display: inline-block;
  margin: 12px 0px; 
  padding: 4px 100px;
  width: 100%;
  background: #4caf50;
  color: #fff;
  height: 52px;
  font-size: 24px;
}

</style>
