<script setup lang="ts">
  const route = useRoute()
  const rowId = route.params.id as string
</script>

<template>
  <div>
    <h1> Product Details </h1>
    <p> Product ID: {{ rowId }} </p>
  </div>
</template>

<style scoped>

</style>
