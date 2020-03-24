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
        <input type="hidden" id="timezone" name="timezone" value="-06:00">
        <div class="form-group">
          <label for="event-time">Date and Time:</label>
          <input type="datetime-local" id="event-time" 
          min="2020-01-01T00:00" max="2021-12-31T11:59"
          class="form-control" v-model="timeStart">
        </div>
        {{timeStart}}
        



        <div class="form-group">
          <label>Duration:</label>
          <input type="integer" class="form-control" v-model="duration">
        </div>
        <div class="form-group">
          <label for="categories">Choose a Category:</label>
          <select id="categories" type="integer" class="form-control multiple-selector" v-model="categoryId">
            <option value="1">Sewing</option>
            <option value="2">General Craft</option>
            <option value="3">Beading & Jewelry</option>
            <option value="4">Candlemaking</option>
            <option value="5">Pottery</option>
            <option value="6">Painting & Drawing</option>
            <option value="7">Quilting</option>
            <option value="8">Scrapbooking</option>
            <option value="9">Woodworking</option>
            <option value="10">Knitting & Crochet</option>
            <option value="11">Stitching</option>
          </select>
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
          <label>Image:</label>
          <input type="file" class="form-control" v-on:change="setFile($event)" ref="fileInput">
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

<style>
  input.form-control {
    color: #495057 !important;
  }
</style>

<script>
import axios from "axios";
import moment from 'moment';

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
      image: "",   
      slots: "",
      errors: [],
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },

    submit: function() {
      var formData = new FormData();

      formData.append("title", this.title);
      formData.append("short_description", this.shortDescription);
      formData.append("details", this.details);
      formData.append("time_start", moment(this.timeStart).format());
      formData.append("duration", this.duration);
      formData.append("category_id", this.categoryId);
      formData.append("kit_price", this.kitPrice);
      formData.append("address", this.address);
      if (this.image) {
        formData.append("image", this.image);
      }
      
      formData.append("slots", this.slots);
      
      axios
        .post("/api/events", formData)
        .then(response => {
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>