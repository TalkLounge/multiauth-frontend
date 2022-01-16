<template>
  <div>
    <TheHeader />
    <main class="container">
      <Nuxt />
    </main>
  </div>
</template>

<style>
h4 {
  margin-top: 0.5rem;
  margin-bottom: 0;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  background-color: #343a40 !important;
  color: #f8f9fa !important;
}

.w-mc {
  width: max-content;
}

.flex-align-vertical {
  display: flex;
  align-self: center;
}

.flex-align-bottom {
  display: flex;
  align-self: end;
}

.flex-text-center {
  display: flex;
  justify-content: center;
}

.info {
  padding: 2%;
  border: 1px solid grey;
  border-radius: 1rem;
}
</style>