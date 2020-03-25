<template>
  <div class="users-show">

  <!-- begin pasted content -->
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
          
          <li class="col-md-6 col-lg-4 project project-box" data-groups='["illustrations"]'>
            <figure class="portfolio-item effect-info">
              <div class="about-image text-center">
                  <img :src="user.profile_img" alt="">
              </div>
              
              <div class="project-info text-center inner-space-2x bg-white rectangle no-border">
                <h4 class="project-title mt-0 mb-3">{{ user.first_name }} {{user.last_name}}</h4>
                <p class="project-info-text mb-1">{{ user.email }}</p>
                <p class="project-info-skill bg-transparent text-grey mb-2">{{ user.address }}</p>
                <router-link :to="`/users/${user.id}/edit`" class="btn btn-primary pill">Edit Profile</router-link>
                <!-- <router-link :to="`/users/${user.id}/edit`">Edit User</router-link> -->
              </div><!-- / project-info -->
              <figcaption>
                <div class="">
                  <div class="">
                    <a href="images/project1.jpg" class="image-lightbox"><i class="fas fa-search"></i></a>
                  </div><!-- / project-icons -->
                </div><!-- / hover-content -->
                <a class="project-link" href="single-project.html"></a><!-- / project-link -->
              </figcaption>
            </figure><!-- / portfolio-item -->
          </li><!-- / project -->         <!-- / project -->
        </ul> <!-- / portfolio -->
      </div><!-- / container -->
    </section>
  <!-- end pasted content -->



    
    <!-- <div>
      <p>{{ user }}</p>
      <p>{{ user.id }}</p>
      <h2>{{ user.first_name }} {{user.last_name}}</h2>
      <p>Email: {{ user.email }}</p>      
      <p>Address: {{ user.address }}</p>
      <p>profile_img: {{ user.profile_img }}</p>
      <img v-bind:src="user.profile_img" height="100" width="100">
      
      <router-link :to="`/users/${user.id}/edit`">Edit User</router-link>
      
      <br>
    </div> -->
   
  </div>
</template>

<style>

</style>

<script>

import axios from 'axios';
export default {
  data: function() {
    return {
      message: "User Profile",
      user: {}
      
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {}
    
};
</script>