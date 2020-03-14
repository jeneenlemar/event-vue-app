<template>
  <div class="users-edit">

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Update Profile</h1>
        <img v-if="errors.length" src="https://http.cat/100">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>First Name:</label> 
          <input type="text" class="form-control" v-model="user.first_name">
        </div>
        <div class="form-group">
          <label>Last Name:</label>
          <input type="text" class="form-control" v-model="user.last_name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="user.email">
        </div>
        <div class="form-group">
          <label>Address:</label>
          <input type="text" class="form-control" v-model="user.address">
        </div>
        <div class="form-group">
          <label>Profile Image Url:</label>
          <input type="text" class="form-control" v-model="user.profile_img">
        </div>        
        <input type="submit" class="btn btn-primary" value="Update Profile">
        <div>
         <button v-on:click="destroyUser()">Delete My Account</button>
      </div>
      </form>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        address: this.user.address,
        profile_img: this.user.profile_img
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then(response => {
          this.$router.push(`/api/users/${this.user.id}`);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      confirm("Are you sure you want to cancel this event?");
      axios.delete(`/api/users/${this.user.id}`).then(response => {
        console.log("User account successfully deleted", response.data);
        this.$router.push("/events");
      });
    }
  }
};
</script>