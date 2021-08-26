<template>
  <div class="loader">
    <p></p>
    <h4>Loading</h4>
  </div>
</template>
<style lang="scss">
$bg-color: #16e590;

$inbox-primary: #edf2f4;
$inbox-secondary: lighten($bg-color, 7%);
$inbox-width: 650px;
$inbox-height: 450px;
$inbox-radius: 4px;
@keyframes loading {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
  }
}
.loader {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  height: 100%;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
  p {
    background: $inbox-secondary;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    animation: loading 2000ms cubic-bezier(0.47, 0, 0.745, 0.715) infinite;
    &:before {
      content: "";
      background: $inbox-secondary;
      width: 40px;
      height: 40px;
      opacity: 1;
      display: block;
      transform: translateX(-10px) translateY(-10px);
      border-radius: 100%;
      animation: loading 2000ms cubic-bezier(0.47, 0, 0.745, 0.715) infinite;
      animation-delay: 50ms;
    }
  }
  h4 {
    margin: 1em auto;
    color: $inbox-secondary;
  }
}
</style>
