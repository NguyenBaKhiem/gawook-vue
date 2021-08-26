<template>
  <div class="loading-root">
    <div class="canv" style="--n: 36; --f: 11.430052302761343">
      <div class="drop" style="--k: 0; --s: 0.53"></div>
      <div class="drop" style="--k: 1; --s: 0.91"></div>
      <div class="drop" style="--k: 2; --s: 0.98"></div>
      <div class="drop" style="--k: 3; --s: 0.68"></div>
      <div class="drop" style="--k: 4; --s: 0.84"></div>
      <div class="drop" style="--k: 5; --s: 0.82"></div>
      <div class="drop" style="--k: 6; --s: 1.06"></div>
      <div class="drop" style="--k: 7; --s: 0.72"></div>
      <div class="drop" style="--k: 8; --s: 1.01"></div>
      <div class="drop" style="--k: 9; --s: 1.03"></div>
      <div class="drop" style="--k: 10; --s: 0.95"></div>
      <div class="drop" style="--k: 11; --s: 0.5"></div>
      <div class="drop" style="--k: 12; --s: 0.86"></div>
      <div class="drop" style="--k: 13; --s: 0.88"></div>
      <div class="drop" style="--k: 14; --s: 1.09"></div>
      <div class="drop" style="--k: 15; --s: 0.51"></div>
      <div class="drop" style="--k: 16; --s: 0.53"></div>
      <div class="drop" style="--k: 17; --s: 0.54"></div>
      <div class="drop" style="--k: 18; --s: 0.75"></div>
      <div class="drop" style="--k: 19; --s: 0.69"></div>
      <div class="drop" style="--k: 20; --s: 1.11"></div>
      <div class="drop" style="--k: 21; --s: 0.99"></div>
      <div class="drop" style="--k: 22; --s: 0.4"></div>
      <div class="drop" style="--k: 23; --s: 1.13"></div>
      <div class="drop" style="--k: 24; --s: 0.94"></div>
      <div class="drop" style="--k: 25; --s: 1.07"></div>
      <div class="drop" style="--k: 26; --s: 0.75"></div>
      <div class="drop" style="--k: 27; --s: 0.73"></div>
      <div class="drop" style="--k: 28; --s: 0.81"></div>
      <div class="drop" style="--k: 29; --s: 0.45"></div>
      <div class="drop" style="--k: 30; --s: 0.64"></div>
      <div class="drop" style="--k: 31; --s: 1.02"></div>
      <div class="drop" style="--k: 32; --s: 0.71"></div>
      <div class="drop" style="--k: 33; --s: 0.55"></div>
      <div class="drop" style="--k: 34; --s: 0.99"></div>
      <div class="drop" style="--k: 35; --s: 0.44"></div>
    </div>
    <p align="center" style="position:relative;top: -175px;">loading</p>
  </div>
</template>
<style lang="scss">
$r: 1em;
$t: 1.5s;

.loading-root {
  display: grid;
  place-content: center;
  overflow: hidden;
  margin: 0;
  height: 100%;
  background: #ffffff;
}

.canv {
  --rdist: calc(#{$r}* var(--f));
  --p3d: perspective(20em);
  position: relative;
  padding: calc(var(--rdist) + #{$r});
  background: #ffffff;
  filter: contrast(19);
  animation: fall $t ease-in infinite;
}

@keyframes fall {
  0% {
    transform: var(--p3d) translatey(-80vh) scale(0.25) rotatex(0deg);
  }
  32% {
    transform: var(--p3d) translatey(0) scale(0.35, 0.75) rotatex(0deg);
  }
  33% {
    transform: var(--p3d) translatey(0) scale(0.85, 0.35) rotatex(0deg);
  }
  35%,
  100% {
    transform: var(--p3d) translatey(0) scale(1) rotatex(75deg);
  }
}

.drop {
  --rdrop: calc(var(--s) *#{$r});
  --adrop: var(--k) * 1turn / var(--n);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: calc(-1 * var(--rdrop));
  padding: var(--rdrop);
  border-radius: 50%;
  transform: rotate(calc(var(--adrop) - 45deg)) translate(var(--rdist))
    scale(0, calc(var(--s) * 0.5));
  background: dodgerblue;
  filter: blur(5px);
  animation: wave $t ease-out infinite;
}

@keyframes wave {
  0%,
  32% {
    border-radius: 3px 25% 25% 75%;
    transform: rotate(-45deg) translatey(calc(var(--s) * 1em)) scale(1);
  }
  35% {
    border-radius: 50%;
    transform: rotate(calc(var(--adrop) - 45deg)) translate(0) scale(1);
  }
}
</style>
