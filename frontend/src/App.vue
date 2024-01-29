<template>
  <div id="nav" class="flex items-center justify-center gap-4">
    <router-link to="/" class="hover:text-indigo-600">Home</router-link>
    |
    <router-link to="/orders">Orders</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply text-center mt-14;
}

#nav {
  padding: 30px;

  a {
    @apply font-semibold;

    &:hover {
      @apply text-indigo-600;
    }

    &.router-link-exact-active {
      @apply text-indigo-600;
    }
  }
}
</style>
