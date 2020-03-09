<template>
  <div class="events-new">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>New Party</h1>
        <img v-if="errors.length" src="https://http.cat/100">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Title:</label> 
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
          <label>Short Description:</label>
          <input type="text" class="form-control" v-model="short_description">
        </div>
        <div class="form-group">
          <label>Details:</label>
          <input type="text" class="form-control" v-model="details">
        </div>
        <div class="form-group">
          <label>Date and Time:</label>
          <input type="datetime" class="form-control" v-model="time_start">
        </div>
        <div class="form-group">
          <label>Duration:</label>
          <input type="integer" class="form-control" v-model="duration">
        </div>
        <div class="form-group">
          <label>Category:</label>
          <input type="integer" class="form-control" v-model="category_id">
        </div>
        <div class="form-group">
          <label>Kit Price:</label>
          <input type="decimal" class="form-control" v-model="kit_price">
        </div>
        <div class="form-group">
          <label>Location Description:</label>
          <input type="text" class="form-control" v-model="location_description">
        </div>
        <div class="form-group">
          <label>Address:</label>
          <input type="text" class="form-control" v-model="address">
        </div>
        <div class="form-group">
          <label>Image URL:</label>
          <input type="text" class="form-control" v-model="img_url">
        </div>
        <div class="form-group">
          <label>Slots:</label>
          <input type="integer" class="form-control" v-model="slots">
        </div>
        
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      short_description: "",
      details: "",
      time_start: "",
      duration: "",
      category_id: "",
      kit_price: "",
      location_description: "",
      address: "",
      img_url: "",
      slots: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        short_description: this.short_description,
        details: this.details,
        duration: this.duration,
        category_id: this.category_id,
        kit_price: this.kit_price,
        location_description: this.location_description,
        address: this.address,
        img_url: this.img_url,
        slots: this.slots,
      };
      axios
        .post("/api/events", params)
        .then(response => {
          this.$router.push("/events");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>