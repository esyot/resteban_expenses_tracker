<template>
 

  <main>
    <nav>
      <ul class="flex space-x-4 p-4 bg-blue-500 text-white">
        <li><router-link to="/" class="opacity-50 hover:opacity-100">Home</router-link></li>
        <li><router-link to="/about" class="opacity-50 hover:opacity-100">About</router-link></li>
        <li><router-link to="/track-expenses" class="opacity-50 hover:opacity-100">Track Expenses</router-link></li>
      </ul>
    </nav>

    <!-- This is where the routed components will be displayed -->
    <router-view></router-view>
  </main>
</template>

<script setup>
// No additional setup needed here for routing
</script>
