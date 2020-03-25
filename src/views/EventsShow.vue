<template>
  <div class="events-show">

    <!-- start pasted code -->
    <section id="posts">
      <div class="spacer">&nbsp;</div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 blog-content">
            <div class="blog block">
              <h1>Event Details</h1>
              <img v-bind:src="event.img_url" alt="">
              <div class="post-content">
                <div class="post-meta">
                  <p class="text-sm"><i class="far fa-user text-primary mr-1"></i>{{event.host.first_name}} {{event.host.last_name}}<i class="far fa-clock text-primary ml-3 mr-1"></i> {{ relativeDate(event.time_start) }}
                  </p>
                  <p class="text-sm"><i class="far fa text-primary fa-asterisk"></i>
                  Slots Remaining: {{ event.slots - event.attendees.length }}</p>
                </div><!-- / post-meta -->
                <h2 class="post-title text-bold">{{ event.title }}</h2>
                <p id="large" class="mb-3">{{ event.details }}</p>
                
                <button v-if="(event.slots - event.attendees.length)>0 && $parent.isLoggedIn() && !event.attending && (event.host.id != $parent.getUserId())" class="btn btn-primary pill" v-on:click="createUserEvent()">Join this Party</button>
                <button v-if="event.attending && (event.host.id != $parent.getUserId())" class="btn btn-danger pill" v-on:click="destroyReservation">Cancel My Reservation To This Event</button>
                <router-link v-if="event.host.id == $parent.getUserId()" :to="`/events/${event.id}/edit`" class="btn btn-primary pill" tag="button">Edit</router-link>
               <p class="text-info" v-if="!$parent.isLoggedIn()">Please log in or sign up to join this wonderful event!</p>
               
              </div><!-- / post-content -->
            </div><!-- / blog-block -->

            <div class="spacer">&nbsp;</div>
            <!-- leave this section in case implement later for wanting comments and feedback -->

            
          </div><!-- / blog-content -->

          <div class="col-md-4 blog-sidebar mt-3">
            <div class="sidebar-widget">
              <div class="about-widget">
                <h4 class="widget-title text-center">YOUR HOST</h4>
                <div class="about-image text-center">
                  <img :src="event.host.profile_img" alt="">
                </div><!-- / about-image -->
                <p class="text-center">{{event.host.first_name}} {{event.host.last_name}}</p>
              </div>
              <!-- / about-widget -->
            </div><!-- / sidebar-widget -->

            <div class="sidebar-widget">
              <h4 class="widget-title text-center">LOCATION</h4>
              <div class="spacer">&nbsp;</div>
              <div class="post-widget">
                <ul class="list-unstyled">
                  <li>
                    <div class="recent-posts first">
                      <div class="recent-post-image">

                        <img src="images/blog-post.jpg" alt="">
                      </div><!-- / recent-post-image -->
                      <div class="recent-post-content">
                        <a href="single-post.html" class="recent-post-title">{{ event.location_description }}</a>
                        <div id="map"></div> 
                        <p class="text-sm mb-2">*</p>
                        <p class="text-sm opc-75"><i class="fa fa-location-arrow"></i> {{ event.address }}</p>
                      </div><!-- / recent-post-content -->
                    </div><!-- / recent-posts -->
                  </li>
                  <li>
                    <div class="recent-posts pt-2">
                      <div class="recent-post-image">
                        <img src="images/blog-post2.jpg" alt="">
                      </div>
                    </div><!-- / recent-posts -->
                  </li>
                </ul>
              </div><!-- / post-widget -->
            </div><!-- / sidebar-widget -->

            <div class="sidebar-widget">
              <h4 class="widget-title text-center pb-3">Attendees</h4>
              <ul class="list-unstyled">
                <li v-for="attendee in event.attendees">
                  <div>
                    <div class="about-image text-center">
                      <img :src="attendee.profile_img" alt="">
                    </div>
                    <p class="text-center">{{attendee.first_name}} 
                    {{attendee.last_name}} </p>
                  </div>
                </li>
              </ul>
              
              <!-- / about-image -->
                
              <p class="text-center">Join us for this fabulous event!</p>
              <!-- / input-group -->
            </div><!-- / sidebar-widget -->

            <!-- / sidebar-widget -->
          </div><!-- / blog-sidebar -->
        </div><!-- / row -->
      </div><!-- / container -->
    </section><!-- / posts -->

    <!-- end pasted code -->

    <!-- <h1>{{ message }}</h1>
    <div id="map"></div> 

    <div v-if="event">
      {{event}}
      <h2>Title: {{ event.title }}</h2>
      <div>
        <button v-if="(event.host.id == $parent.getUserId())" v-on:click="destroyEvent()">Cancel This Event</button>
      </div>
      <img v-bind:src="event.img_url" height="100" width="100">
      <p>Hosted by: {{ event.host.first_name }}</p>
      
      <p>Short Description: {{ event.short_description }}</p>
      <p>Date & Time: {{ relativeDate(event.time_start) }}</p>
      <p>Price: {{ event.kit_price }}</p>
      <p>Details: {{ event.details }}</p>
      <p>Location: {{ event.location_description }}</p>
      <p>Address: {{ event.address }}</p>
      <p>hostid: {{event.host.id}}</p>

      {{event.attendees}}
      <h2>Attendee List</h2>
      <div v-for="attendee in event.attendees">
        {{attendee.first_name}} 
        {{attendee.last_name}} 
        <img v-bind:src="attendee.profile_img" height="100" width="100">
      </div>
      
      <p>Slots Remaining: {{ event.slots - event.attendees.length }}</p> -->
      
      
      <!-- <button v-if="!event.attending && (event.host.id != $parent.getUserId())" v-on:click="createUserEvent()">Join this Party</button>
      <button v-if="event.attending && (event.host.id != $parent.getUserId())" v-on:click="destroyReservation">Cancel this reservation</button> -->
            
      
      
    </div>
</template>

<style>
#large {
  font-size: 1.6rem;
}
#map { top: 0; bottom: 0; width: 300px; height: 300px; }
</style>

<script>

import axios from 'axios';
import moment from 'moment';
/*global mapboxgl*/
/*global mapboxSdk*/

export default {
  data: function() {
    return {
      message: "Party Details",
      event: null,
      attendee: {}
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.event = response.data;
      mapboxgl.accessToken = 'pk.eyJ1IjoiamxlbWFyMjYiLCJhIjoiY2s3YXk2NHMxMDB1cjNqcXZkYjd4b2M0MSJ9.UIUokQ1ceKXEBogxamS2gw';
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      mapboxClient.geocoding
        .forwardGeocode({
          query: this.event.address,
          autocomplete: false,
          limit: 1
        })
        .send()
        .then(function(response) {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {
            var feature = response.body.features[0];
           
            var map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: feature.center,
              zoom: 12
            });
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
          }
        });
    });
  },
  methods: {
    createUserEvent: function() {
      var params = {
        event_id: this.event.id
      };
      axios
        .post("/api/user_events", params)
        .then(response => {
          console.log("Party Reservation Accepted", response.data);
          this.event.attending = true;
          this.event.attendees.push(response.data.attendee);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyReservation: function() {
      if (confirm("Are you sure you want to cancel this reservation?")) {
        axios.delete(`api/user_events/${this.event.id}`).then(response => {
          console.log("This reservation has been cancelled", response.data);
          this.event.attending = false;
          var index = this.event.attendees.findIndex(user => user.id == this.$parent.getUserId());
          console.log(index);
          this.event.attendees.splice(index, 1);
        });
      }
    },
    destroyEvent: function() {
      if (confirm("Are you sure you want to cancel this event?")) {
        axios.delete(`api/events/${this.event.id}`).then(response => {
          console.log("Cancellation Successful", response.data);
        });
      }      
    },
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },  
};
</script>