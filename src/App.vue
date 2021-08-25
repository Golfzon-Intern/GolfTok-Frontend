<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
:root {
  --background-color: #fff;
  --text-main-color: #212529;
  --text-sub-color: #4a4a4a;
  --accent-main-color: #fa5252;
  --accent-sub-color: #ffe3e3;
  --supplement-color: #f1f1f1;
}

body {
  margin: 0;
  min-width: 500px;
}

a {
  text-decoration: none;
}

p {
  margin: 0;
}

h1,
h2,
h3,
h4,
span,
p,
strong,
div,
a,
input {
  font-family: Helvetica, Arial, sans-serif;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--background-color);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #e9ecef;
  border-radius: 8px;
}

@media screen and (max-width: 500px) {
  body {
    overflow-x: hidden;
  }
}
</style>
