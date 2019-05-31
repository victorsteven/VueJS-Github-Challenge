<template>
  <div>
     <article class="panel">
        <div class="panel_right">
          <h2 class="panel_name">{{ user.name }}</h2>
          <div class="panel_bio">{{ user.bio }}</div>
          <div class="panel_followers" v-if="user.followers">Followers: {{ user.followers }}</div>
          <p>{{ user.location }}</p>
        </div>
        <div class="panel_left">
          <div class="panel_image">
            <!-- <img v-if="user.avatar_url" :src="user.avatar_url" :alt="user.name"> -->
            <img class="panel_image_avatar" v-if="user.avatar_url" :src="user.avatar_url" :alt="user.name">

          </div>
        </div>
      </article>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>
