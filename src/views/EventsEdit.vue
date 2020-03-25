<template>
  <div class="events-edit">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Update Party</h1>
        <img v-if="errors.length" src="https://http.cat/100">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Title:</label> 
          <input type="text" class="form-control" v-model="event.title">
        </div>
        <div class="form-group">
          <label>Short Description:</label>
          <input type="text" class="form-control" v-model="event.short_description">
        </div>
        <div class="form-group">
          <label>Details:</label><br>
          <textarea cols="100" rows="10" v-model="event.details"></textarea>
          <!-- <input type="text" class="form-control" v-model="event.details"> -->
        </div>
        <div class="form-group">
          <label for="event-time">Date and Time:</label>
          <input type="datetime-local" id="event-time" 
          min="2020-01-01T00:00" max="2021-12-31T11:59"
          class="form-control" v-model="event.time_start">
        </div>

        <div>
          {{event.time_start}}
        </div>
        

        <div class="form-group">
          <label>Duration:</label>
          <input type="integer" class="form-control" v-model="event.duration">
        </div>
        <div class="form-group">
          <label>Category:</label>
          <!-- <input type="integer" class="form-control" v-model="event.category_id"> -->
          <label for="categories">Choose a Category:</label>
          <select id="categories" type="integer" class="form-control multiple-selector" v-model="event.category_id">
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
          <input type="decimal" class="form-control" v-model="event.kit_price">
        </div>
        <div class="form-group">
          <label>Location Description:</label>
          <input type="text" class="form-control" v-model="event.location_description">
        </div>
        <div class="form-group">
          <label>Address:</label>
          <input type="text" class="form-control" v-model="event.address">
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="file" class="form-control" v-on:change="setFile($event)" ref="fileInput">
        </div>
        <div class="form-group">
          <label>Slots:</label>
          <input type="integer" class="form-control" v-model="event.slots">
        </div>
        <input type="submit" class="btn btn-primary" value="Update Event">
      </form>
      <div>
         <button v-on:click="destroyEvent()">Cancel This Event</button>
      </div>
     
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      event: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.event = response.data;
    });
  },
  methods: {
    submit: function() {
      var formData = new FormData();

      formData.append("title", this.event.title);
      formData.append("short_description", this.event.short_description);
      formData.append("details", this.event.details);      
      formData.append("time_start", this.event.time_start);
      formData.append("duration", this.event.duration);
      formData.append("category_id", this.event.category_id);
      formData.append("kit_price", this.event.kit_price);
      formData.append("location_description", this.event.location_description);
      formData.append("address", this.event.address);
      if (this.event.img_url) {
        formData.append("img_url", this.event.img_url);
      }
        // submit: function() {
        //   var params = {
        //     title: this.event.title,
        //     short_description: this.event.short_description,
        //     details: this.event.details,
        //     time_start: this.event.time_start,
        //     duration: this.event.duration,
        //     category_id: this.event.category_id,
        //     kit_price: this.event.kit_price,
        //     location_description: this.event.location_description,
        //     address: this.event.address,
        //     img_url: this.event.img_url,
        //     slots: this.event.slots,
        //   };
      axios
        .patch(`/api/events/${this.event.id}`, formData)
        .then(response => {
          this.$router.push(`/events/${this.event.id}`);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyEvent: function() {
      axios.delete(`/api/events/${this.event.id}`).then(response => {
        console.log(response.data);
        this.$router.push("/user_events");
      });
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.event.img_url = event.target.files[0];
      }
    },
  }
};
</script>