<template>
  <div class="events-show">
    <h1>{{ message }}</h1>
    <div>
      <h2>Title: {{ event.title }}</h2>
      <h2>Short Description: {{ event.short_description }}</h2>
      <!-- add additional here later once basic works! -->
    </div>
    Host: {{ event.host.first_name }}<br>

    <router-link :to="`/events/${event.id}/edit`">Edit</router-link>
    <router-link :to="`/user_events/${user_event.id}`">Join This Party</router-link>
    
   <!--  Current User: {{ $parent.getUserId()}} <br> -->
    <!-- <router-link v-if="event.user_id == $parent.getUserId()" :to="`/events/${event.id}/edit`">Edit</router-link> -->
  </div>
</template>

<style>
 img {
  width: 250px;
 }
</style>

<script>

import axios from 'axios';
export default {
  data: function() {
    return {
      message: "Party Details",
      event: {},
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.event = response.data;
    });
  },
  methods: {}
    
};
</script>