<script setup lang="ts">
const bobbin = ref('#AAA')
const pole = ref('#EEE')
const coilStart = ref('green')
const coilEnd = ref('red')
const coil = ref('oklch(53% 0.12 45)')
</script>

<template>
  <div class="pickups-component">
    <svg width="320" height="120" viewBox="0 0 345 130">
      <rect
        x="10"
        y="10"
        width="330"
        height="80"
        rx="40"
        ry="40"
        :fill="bobbin"
        :stroke="bobbin"
        opacity="0.7"
        stroke-width="10"
      />
      <circle
        id="pole"
        cx="50"
        cy="50"
        r="14"
        :fill="pole"
        stroke="none"
      />
      <use href="#pole" transform="translate(50)" />
      <use href="#pole" transform="translate(100)" />
      <use href="#pole" transform="translate(150)" />
      <use href="#pole" transform="translate(200)" />
      <use href="#pole" transform="translate(250)" />
      <rect
        v-for="(i) in 7"
        id="coil"
        :key="i"
        :x="20 + 2 * i"
        :y="20 + 2 * i"
        :width="310 - 4 * i"
        :height="60 - 4 * i"
        :rx="30 - 2 * i"
        :ry="30 - 2 * i"
        fill="none"
        :stroke="coil"
        stroke-width="1"
      />
      <path
        d="M 220 66 A 33 33 0 0 0 190 100"
        fill="none"
        :stroke="coil"
        stroke-width="1"
      />
      <path
        d="M 136 78 A 22 22 0 0 1 160 100"
        fill="none"
        :stroke="coil"
        stroke-width="1"
      />
      <circle
        id="coilStart"
        cx="160"
        cy="105"
        r="5"
        fill="none"
        :stroke="coilStart"
        stroke-width="5"
      />
      <circle
        id="coilEnd"
        cx="190"
        cy="105"
        r="5"
        fill="none"
        :stroke="coilEnd"
        stroke-width="5"
      />
      <path
        d="M 160 110 L 160 120 L 360 120"
        fill="none"
        :stroke="coilStart"
        stroke-width="4"
      />
      <path
        d="M 195 105 L 360 105"
        fill="none"
        :stroke="coilEnd"
        stroke-width="4"
      />
    </svg>
  </div>
</template>
