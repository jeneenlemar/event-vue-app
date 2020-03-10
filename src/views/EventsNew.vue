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
          <input type="text" class="form-control" v-model="shortDescription">
        </div>
        <div class="form-group">
          <label>Details:</label>
          <input type="text" class="form-control" v-model="details">
        </div>
        <div class="form-group">
          <label>Date and Time:</label>
          <input type="datetime" class="form-control" v-model="timeStart">
        </div>
        <div class="form-group">
          <label>Duration:</label>
          <input type="integer" class="form-control" v-model="duration">
        </div>
        <div class="form-group">
          <label>Category:</label>
          <input type="integer" class="form-control" v-model="categoryId">
        </div>
        <div class="form-group">
          <label>Kit Price:</label>
          <input type="decimal" class="form-control" v-model="kitPrice">
        </div>
        <div class="form-group">
          <label>Location Description:</label>
          <input type="text" class="form-control" v-model="locationDescription">
        </div>
        <div class="form-group">
          <label>Address:</label>
          <input type="text" class="form-control" v-model="address">
        </div>
        <div class="form-group">
          <label>Image URL:</label>
          <input type="text" class="form-control" v-model="imgUrl">
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
      shortDescription: "",
      details: "",
      timeStart: "",
      duration: "",
      categoryId: "",
      kitPrice: "",
      locationDescription: "",
      address: "",
      imgUrl: "",
      slots: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        short_description: this.shortDescription,
        details: this.details,
        duration: this.duration,
        category_id: this.categoryId,
        kit_price: this.kitPrice,
        location_description: this.locationDescription,
        address: this.address,
        img_url: this.imgUrl,
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