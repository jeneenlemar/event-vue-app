<template>
  <div class="categories-show">


<section id="portfolio" class="p-0 info-effect">
      <div class="container">
        <!-- portfolio filter -->
       <h1>{{ message }}</h1> 
        <!-- / portfolio filter -->
      </div><!-- / container -->
      <div class="container">
        <h3 class="section-title hidden">WORK</h3>
        <ul class="row portfolio info-effect lightbox list-unstyled mb-0" id="grid">
          <!-- project -->
          <li v-for="event in events" class="col-md-6 col-lg-4 project project-box" data-groups='["illustrations"]'>
            <figure class="portfolio-item">
              <img :src="event.img_url" alt="">
              <div class="project-info text-center inner-space-2x bg-white rectangle no-border">
                <h4 class="project-title mt-0 mb-3">{{ event.title }}</h4>
                <p class="project-info-text mb-1">{{ event.short_description }}</p>
                <p class="project-info-skill bg-transparent text-grey mb-2">{{ relativeDate(event.time_start) }}</p>
                <router-link :to="`/events/${event.id}`" class="btn btn-primary pill">Details</router-link>
              </div><!-- / project-info -->
              
            </figure><!-- / portfolio-item -->
          </li><!-- / project --><!-- / project -->
        </ul> <!-- / portfolio -->
      </div><!-- / container -->
    </section>    
  </div>
</template>

<style>

</style>

<script>
import axios from "axios";
import Vue2Filters from 'vue2-filters';
import moment from 'moment';

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Crafting Events List By Category",
      events: []
    };
  },
  created: function() {
    axios.get(`/api/categories/${this.$route.params.id}`).then(response => {
      console.log(response.data); this.events = response.data;
    });
  },

  
  methods: {
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  }
};
</script>