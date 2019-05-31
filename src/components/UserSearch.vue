<template>
  <div>
    <div class="wrapper_input">
      <form @submit.prevent="$emit('submitted', username)">
        <input
          type="text"
          class="input_search"
          placeholder="Search for Github User..."
          v-model="username"
          />
        <button type="submit" class="button_search">
          Search
        </button>
      </form>
    </div>
  </div>
</template>
