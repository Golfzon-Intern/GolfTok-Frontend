<template>
  <div class="comment-input-wrap">
    <div class="comment-text-input">
      <input type="text" placeholder="Add comment..." />
    </div>
    <div class="comment-post-btn">
      <button>Post</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.comment-input-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  margin-bottom: -5px;
  font-family: Helvetica, Arial, sans-serif;
}
.comment-text-input {
  position: relative;
  width: 80%;
  height: 45px;
  box-sizing: border-box;
  background: #e9ecef;
  border: 1px solid transparent;
  border-radius: 8px;
}
.comment-text-input:focus {
  background: yellowgreen;
}
.comment-text-input input {
  padding: 0 8px;
  border: none;
  background: none;
  width: 100%;
  height: 100%;
}
.comment-text-input input:focus {
  outline: none;
  border: 1px solid #ced4da;
  border-radius: 8px;
}
.comment-post-btn {
  width: 20%;
  height: 45px;
}
.comment-post-btn button {
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  font-size: 0.875rem;
  color: #212529;
  opacity: 0.5;
}
</style>
