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
          <label for="categories">Choose a Category:</label>
          <select id="categories" type="integer" class="form-control" v-model="categoryId">
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
      formData.append("timeStart", this.timeStart);
      formData.append("duration", this.duration);
      formData.append("category_id", this.categoryId);
      formData.append("kit_price", this.kitPrice);
      formData.append("address", this.address);
      formData.append("image", this.image);
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