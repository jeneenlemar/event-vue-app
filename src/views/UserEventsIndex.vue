<template>
  <div class="user_events-index">
    <div class="spacer-2x">&nbsp;</div>

    <!-- pasted content -->
    <section id="portfolio" class="p-0 info-effect">
      <div class="container">
           
        <!-- portfolio filter -->
        
        <!-- / portfolio filter -->
      </div><!-- / container -->
      <div class="container">
        <div>
          
          <h3 class="section-title text-center mb-0">Parties I'm Hosting</h3>
        </div>
        
        <h3 class="section-title hidden">WORK</h3>
        <ul class="row portfolio info-effect lightbox list-unstyled mb-0" id="grid">
          <!-- project -->
        
          <li v-for="hostingEvent in userEvents.hosting_events" class="col-md-6 col-lg-4 project project-box" data-groups='["illustrations"]'>
            <figure class="portfolio-item">
              <img :src="hostingEvent.img_url" alt="">
              <div class="project-info text-center inner-space-2x bg-white rectangle no-border">
                <h4 class="project-title mt-0 mb-3">{{hostingEvent.title}}</h4>
                <p class="project-info-text mb-1">{{hostingEvent.short_description}}</p>
                <p class="project-info-skill bg-transparent text-grey mb-2">{{ relativeDate(hostingEvent.time_start)}}</p>
                <router-link :to="`/events/${hostingEvent.id}`" class="btn btn-primary pill">Details</router-link>
                <router-link :to="`/events/${hostingEvent.id}/edit`" class="btn btn-primary pill">Edit</router-link>
                <button class="btn btn-danger pill" v-on:click="destroyEvent(hostingEvent)">Cancel This Event</button>


              </div><!-- / project-info -->
              
            </figure><!-- / portfolio-item -->
          </li><!-- / project -->
        </ul> <!-- / portfolio -->
      </div><!-- / container -->

      <!-- SECOND section for parties attending -->
      <div class="container">
        <h3 class="section-title text-center mb-0">Parties I'm Attending</h3>
        <h3 class="section-title hidden">WORK</h3>
        <ul class="row portfolio info-effect lightbox list-unstyled mb-0" id="grid">
          <!-- project -->
          
          <li v-for="attendingEvent in userEvents.attending_events" class="col-md-6 col-lg-4 project project-box" data-groups='["illustrations"]'>
            <figure class="portfolio-item effect-info">
              <img :src="attendingEvent.event.img_url" alt="">
              <div class="project-info text-center inner-space-2x bg-white rectangle no-border">
                <h4 class="project-title mt-0 mb-3">{{attendingEvent.event.title}}</h4>
                <p class="project-info-text mb-1">{{attendingEvent.event.short_description}}</p>
                <p class="project-info-skill bg-transparent text-grey mb-2">{{relativeDate(attendingEvent.event.time_start)}}</p>
                <router-link :to="`/events/${attendingEvent.event.id}`" class="btn btn-primary pill">Details</router-link>
              </div><!-- / project-info -->
              <figcaption>
                <div class="hover-content">
                  <div class="project-icons">
                    <a href="images/project1.jpg" class="image-lightbox"><i class="fas fa-search"></i></a>
                  </div><!-- / project-icons -->
                </div><!-- / hover-content -->
                <a class="project-link" href="single-project.html"></a><!-- / project-link -->
              </figcaption>
            </figure><!-- / portfolio-item -->
          </li><!-- / project -->
        </ul> <!-- / portfolio -->
      </div><!-- / container -->
    </section>
    <!-- end pasted content -->
  

      <!-- {{userEvents.hosting_events}} -->
      <!-- <div v-for="hostingEvent in userEvents.hosting_events">
        <p><b>{{hostingEvent.title}}</b></p>
        <p>{{hostingEvent.id}}</p> 
        <p>{{hostingEvent.short_description}}</p>    
        <p>Start: {{ relativeDate(hostingEvent.time_start)}}</p>
        <p>Slots: {{hostingEvent.slots}}</p>

          <p> Slots Remaining: </p>

        <div>
          <router-link :to="`/events/${hostingEvent.id}`">Details</router-link> <br>
          <router-link :to="`/events/${hostingEvent.id}/edit`">Edit</router-link>
        </div> 
          <button v-on:click="destroyEvent(hostingEvent)">Cancel This Event</button> 
        </div> -->
      <div>

        <!-- <p>{{userEvents.attending_events}}</p> -->
        <!-- <div v-for="attendingEvent in userEvents.attending_events">
          <p><b>{{attendingEvent.event.title}}</b></p> 
          <p>{{attendingEvent.event.id}}</p> 
          <p>{{attendingEvent.event.short_description}}</p> 
          <p>{{relativeDate(attendingEvent.event.time_start)}}</p> 
          <div>
            <router-link :to="`/events/${attendingEvent.event.id}`">Details</router-link> <br>

          </div>   -->
          <!-- <button v-on:click="destroyUserEvent(attendingEvent)">Cancel This Party Reservation</button> 
        </div> -->
      </div> 
    </div>
  </template>

  <style>

</style>

<script>
import axios from "axios";
import moment from 'moment';

export default {
  data: function() {
    return {
      message: "Parties I'm Hosting",
      message2: "Parties I'm Attending",
      userEvents: {},
    };
  },
  created: function() {
    axios.get("/api/user_events").then(response => {
      console.log(response.data); this.userEvents = response.data;
    });
  },


  methods: {
    destroyEvent: function(hostingEvent) {
      if (confirm("Are you sure you want to cancel this event?")) {
        axios.delete(`api/events/${hostingEvent.id}`).then(response => {
          console.log("Cancellation Successful", response.data);
          var index = this.userEvents.hosting_events.indexOf(hostingEvent);
          this.userEvents.hosting_events.splice(index, 1);
        });
      }      
    },
    destroyUserEvent: function(attendingEvent) { 
      if (confirm("Are you sure you want to cancel this reservation?")) {
        axios.delete(`api/user_events/${attendingEvent.id}`).then(response => {
          console.log("Reservation Cancellation Successful", response.data);
          var index = this.userEvents.attending_events.indexOf(attendingEvent);
          this.userEvents.attending_events.splice(index, 1);
        });
      }

    },
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
};
</script>
