<template>
  <div id="app" v-cloak>
    <div class="preloader-background" v-if="loading">
        <p class="loader" style="font-size: 40px; color: #304ffe"></p>
    </div>

    <UserSearch @submitted="searchUser"/>

    <div v-if="user">
      <div class="header_style">
        <h3>Profile</h3>
      </div>

      <UserProfile :user="user"/>

      <div class="header_style" v-if="the_followers.length > 0">
        <h3>Followers</h3>
      </div>
      <span v-for="(follower, index) in the_followers" :key="index">
        <div class="follower_style" v-if="user">
            <div class="follower_image">
                <img v-if="follower.avatar_url" :src="follower.avatar_url" alt="no photo">
            </div>
        </div>
      </span>

      <div class="wrapper" v-if="the_followers.length > 0 && !lastItem">
          <button
            v-if="loading"
            :disabled="disabled"
            type="button"
            class="load_more"
            >
            Loading ...
        </button>

        <button
          :disabled="disabled"
          v-if="!loading"
          @click="getMoreFollowers"
          type="button"
          class="load_more"
          >
          Load More
        </button>
      </div>
    </div>

    <div v-if="not_user">
      <article class="panel">
        <div class="panel_right">
          <h2 class="panel_name">No User found</h2>
          <div class="panel_bio">Sorry. This user does not exists</div>
        </div>
        <div class="panel_left">
          <div class="panel_alt_image">
            <img alt="User not found" src="../assets/user_404.png">
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserProfile from './UserProfile';
import UserSearch from './UserSearch';

export default {
  components: {
    UserProfile, UserSearch,
  },

  data() {
    return {
      loading: false,
      user: '',
      userObject: {},
      not_user: false,
      found: '',
      followers: '',
      the_followers: '',
      followersObject: {},
      next_url: '',
      lastItem: false,
    };
  },
  mounted() {
    console.log('Component mounted');
  },

  computed: {
    disabled() {
      return this.loading;
    },
  },

  methods: {

    searchUser(user) {
      if (user == '') {
        return;
      }
      this.the_followers = '';
      this.loading = true;
      const url = `https://api.github.com/users/${user}`;

      axios.get(url).then((res) => {
        this.loading = false;
        this.not_user = false;
        this.user = res.data;
        console.log('This is the user: ', this.user);
        if (this.user.followers > 0) {
          this.getFollowers(this.user.followers_url);
        }
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.user = null;
        this.not_user = true;
        console.log('error getting the user: ', err);
      });
    },

    getFollowers(url) {
      this.loading = true;

      axios.get(url).then((res) => {
        this.loading = false;

        if (res.data.length < 30) {
          this.lastItem = true;
          console.log('the followers are less than  30');
        } else {
          this.lastItem = false;
          console.log('the followers are more than  30');
          const links = this.getLinks(res.headers.link);
          this.next_url = links._next;
        }
        this.the_followers = res.data;
      }).catch((err) => {
        this.loading = false;
        console.log('these are the errors getting followers: ', err);
      });
    },

    getLinks(theLinks) {
      const links = {};
      if (!theLinks) {
        return links;
      }
      theLinks.split(',').forEach((eachComponent) => {
        const url = eachComponent.substring(eachComponent.indexOf('<') + 1, eachComponent.indexOf('>'));
        const rel = eachComponent.substring(eachComponent.indexOf('rel="') + 5).replace('"', '');
        links[`_${rel}`] = url;
      });
      return links;
    },

    getMoreFollowers() {
      this.loading = true;

      axios.get(this.next_url).then((res) => {
        this.loading = false;
        const new_followers = res.data;
        new_followers.forEach((follower) => {
          this.the_followers.push(follower);
        });
        const links = this.getLinks(res.headers.link);
        const nextUrl = links._next;

        if (nextUrl === undefined) {
          this.lastItem = true;
        } else {
          this.next_url = nextUrl;
        }
      }).catch((err) => {
        this.loading = false;
        console.log('these are the errors getting new followers: ', err);
      });
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
.wrapper_input {
  text-align: center;
  margin-top: 40px;
}

.input_search {
  width: 38%;
  padding: 14px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.header_style {
  text-align: center;
  margin-top: 60px;
}

.button_search {
  padding: 10px 40px;
  margin: 9px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #3498db;
  font-size: 18px;
  color: #fff;
}

.panel {
  border: 1px solid #F4F4F4;
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: #333333;
  width: 50%;
  margin: auto;
  margin-top: 20px;
  min-height: 200px;
}

.panel_right {
  width: 100%;
  box-sizing: border-box;
  padding: 1.0rem;
}
@media screen and (min-width: 40rem) {
  .panel_right {
    width: 55%;
    float: right;
  }
}
.panel_left {
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 1.5rem;
  height: auto;
}

@media screen and (min-width: 40rem) {
  .panel_left {
    width: 45%;
  }
}

.panel_bio {
  margin-top: 10px;
  margin-bottom: 10px;
}

.panel_name {
  letter-spacing: 1px;
  font-weight: 200;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 2.25rem;
}

.panel_image, .panel_alt_image {
  box-sizing: border-box;
}
.panel_image img {
  width: 50%;
  background-color: #F4F4F4;
  border: 1px solid #E8E8E8;
  border-radius: 50%;
}

.panel_alt_image img {
  width: 80%;
  background-color: #F4F4F4;
  border: 1px solid #E8E8E8;
  border-radius: 70%;
}

.load_button {
  width: 60%;
  margin: auto;
  margin-top: 40px;
}

.loader {
  z-index: 5000;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: absolute;
  left: 45%;
  top: 40%;
  }
  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .load_more {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    text-align: center;
    font-size: 20px;
    border: 1px solid #fff;
    border-radius: 10px;
  }

  .wrapper {
    text-align: center;
    margin-top: 40px;
}

.preloader-background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: absolute;
  z-index: 999;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
}

.follower_style {
  width: 20%;
  text-align: center;
  margin: auto;
}

.follower_image img {
  width: 50%;
  background-color: #F4F4F4;
  border: 1px solid #E8E8E8;
  border-radius: 50%;
  margin: 10px 0px;
}

</style>
