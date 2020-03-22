<template>
  <div class="events-index">


    <section id="portfolio" class="p-0 info-effect">

      <div class="form-group">
        <input class="form-control" placeholder="search" type="text" v-model="keywordFilter">  
      </div>
      
      <div class="container">

        <ul class="row portfolio info-effect lightbox list-unstyled mb-0" id="grid">
          <h3 class="section-title hidden">WORK</h3>
          <!-- project -->
          <div>
               <h1>Upcoming Events</h1>
          </div>
       
          <li v-for="event in filterBy(orderBy(events, 'time_start', 1), keywordFilter)" class="col-md-6 col-lg-4 project project-box">
            <figure class="portfolio-item effect-info">
              <img :src="event.img_url" alt="">
              <div class="project-info text-center inner-space-2x bg-white rectangle no-border">
                <h4 class="project-title mt-0 mb-3">{{ event.title }}</h4>
                <p class="project-info-text mb-1">{{ event.short_description }}</p>
                <p class="project-info-skill bg-transparent text-grey mb-2">{{ relativeDate(event.time_start) }}</p>
                <router-link :to="`/events/${event.id}`" class="btn btn-primary pill">Details</router-link>
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
    <!-- / portfolio -->
  <!-- end of top section -->
  <!-- begin categories section -->
  <!-- / container -->
            <div class="container">
               <h1>Categories</h1>
                <h3 class="section-title hidden">WORK</h3>
                <ul class="row portfolio line-effect lightbox list-unstyled mb-0" id="grid">
                    <!-- project -->
                   <!-- / project -->

                    <!-- project -->
                    <li v-for="category in categories" class="col-md-6 col-lg-4 project" data-groups='["design", "branding"]'>
                        <figure class="portfolio-item effect-bubba">
                            <img v-bind:src="category.img_url" alt="">
                            <figcaption>
                              <router-link :to="`/categories/${category.id}`">
                                <div class="hover-content">
                                    <h2 class="hover-title text-center text-white">{{category.name}}</h2><!-- / hover-title -->
                                    <!-- / project-skills -->
                                </div>
                              </router-link>
                                <!-- / hover-content -->
                                <!-- / project-link -->
                                <a href="images/project2.jpg" class="image-lightbox"><i class="fas fa-search"></i></a>
                            </figcaption>
                        </figure><!-- / portfolio-item -->
                    </li><!-- / project -->
                </ul> <!-- / portfolio -->
            </div><!-- / container -->

  <!-- end pasted elements for categories section -->

   

    


   
   <!--  <div v-for="category in categories">
      <p>{{category.name}}</p>
      <img v-bind:src="category.img_url" height="100" width="100">
      <router-link :to="`/categories/${category.id}`">Go To Events For This Category</router-link> 
      
    </div> -->
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
      message: "Upcoming Parties",
      events: [],
      categories: [],
      keywordFilter: ""
      
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log(response.data); this.events = response.data;
    });
    axios.get("/api/categories").then(response => {
      console.log(response.data); this.categories = response.data;
    });
  },
  
  
  methods: {
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  }
};
</script>
