<template>
  <div class="follow-btn-wrap">
    <button class="follow-btn">follow</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.follow-btn-wrap {
  overflow: hidden;
  /* width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center; */
}
.follow-btn-wrap .follow-btn {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 22px;
  min-width: 88px;
  padding: 0 10px;
  height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #f03e3e;
  color: #f03e3e;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
