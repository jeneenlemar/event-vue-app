<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-inverse bg-primary fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html"><img src="images/craft_sml_logo.png" alt=""></a>

        <button class="navbar-toggler collapsed menu-text" type="button" data-toggle="collapse" data-target="#navbar-toggle" aria-controls="navbar-toggle" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
          <span class="sr-only">Toggle navigation</span>
        </button><!-- / navbar-toggler -->

        <div class="collapse navbar-collapse" id="navbar-toggle">
          <ul class="navbar-nav ml-auto">
            
            <li class="nav-item">
              <router-link class="nav-link" to="/events">EVENTS</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/events/new">NEW EVENT</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/user_events">MY EVENTS</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" :to="`/users/${getUserId()}`">PROFILE</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" :to="`/users/${getUserId()}/edit`">EDIT PROFILE</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/logout">LOGOUT</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/login">LOGIN</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/signup">SIGNUP</router-link>
            </li>
          </ul><!-- / navbar-nav -->
        </div><!-- / navbar-collapse -->
      </div><!-- / container -->
    </nav><!-- / navbar -->

    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | -->
      
     <!--  <router-link to="/events">All Parties List</router-link> |
      <router-link to="/events/new">Host a Party</router-link> |
      <router-link to="/user_events">My Parties</router-link> | -->
      <!-- <router-link :to="`/users/${getUserId()}`">Profile</router-link> | -->
      <!-- <router-link :to="`/users/${getUserId()}/edit`">Update Profile</router-link> | -->
      <!-- <router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link> | -->
      <!-- <router-link v-if="!isLoggedIn()" to="/login">Login</router-link> --> 
      <!-- <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>  -->

    </div>

    <div class="container" style="padding-top: 120px">
      <router-view/>
    </div>
      
  </div>
</template>

<script>
export default {
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
    }
  }
};
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
