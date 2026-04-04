<script setup lang="ts">
const knobs = [
  { label: 'Gain', value: 0.22 },
  { label: 'Tone', value: 0.58 },
  { label: 'FX', value: 0.78 },
  { label: 'Echo', value: 0.48 }
]
</script>

<template>
  <div class="mx-auto w-full max-w-xl lg:ml-auto">
    <div class="relative overflow-hidden rounded-4xl border border-muted bg-elevated shadow-2xl shadow-primary/10">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,140,163,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(67,155,255,0.14),transparent_30%)]" />

      <div class="relative border-b border-muted/70 px-5 py-4 sm:px-6">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-default ring ring-inset ring-muted">
              <AppLogo class="h-6 w-auto" primary="var(--ui-primary)" accent="var(--ui-secondary)" />
            </div>
            <div>
              <p class="text-sm font-semibold text-highlighted">
                TribeWeb
              </p>
              <p class="text-xs text-muted">
                bespoke applications and technical websites
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-primary" />
            <span class="h-2.5 w-2.5 rounded-full bg-secondary" />
            <span class="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
        </div>
      </div>

      <div class="relative p-5 sm:p-6">
        <div class="overflow-hidden rounded-3xl border border-muted bg-default">
          <div class="border-b border-muted/70 px-4 py-3 sm:px-5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <UBadge label="THR editor" color="primary" variant="soft" />
                <UBadge label="Hyperswitch" color="secondary" variant="soft" />
              </div>
              <div class="flex items-center gap-2 text-muted">
                <UIcon name="i-lucide-guitar" class="size-4" />
                <UIcon name="i-lucide-circuit-board" class="size-4" />
              </div>
            </div>
          </div>

          <div class="grid gap-4 p-4 sm:grid-cols-[1.15fr_0.85fr] sm:p-5">
            <div class="space-y-4">
              <div class="rounded-2xl bg-elevated p-4 ring ring-inset ring-muted">
                <NuxtImg
                  src="/amps/THR30_FLead.png"
                  width="520"
                  height="212"
                  alt="Yamaha THR amp interface visual"
                  class="mx-auto h-auto w-full max-w-sm"
                />
              </div>

              <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div
                  v-for="item in knobs"
                  :key="item.label"
                  class="rounded-2xl bg-elevated p-2 text-center ring ring-inset ring-muted"
                >
                  <ControlKnob :value="item.value" class="mx-auto block h-auto w-full max-w-20.5" />
                  <p class="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                    {{ item.label }}
                  </p>
                </div>
              </div>

              <div class="rounded-2xl bg-elevated p-3 ring ring-inset ring-muted">
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-sliders-horizontal" class="size-4 text-primary" />
                    <span class="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">signal path</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="h-2 w-10 rounded-full bg-primary/25">
                      <span class="block h-2 w-8 rounded-full bg-primary" />
                    </span>
                    <span class="h-2 w-10 rounded-full bg-secondary/25">
                      <span class="block h-2 w-6 rounded-full bg-secondary" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="rounded-2xl bg-elevated p-3 ring ring-inset ring-muted">
                <NuxtImg
                  src="/cabs/custom-build.png"
                  width="360"
                  height="220"
                  alt="Speaker cabinet visual"
                  class="mx-auto h-auto w-full max-w-47.5"
                />
              </div>

              <div class="overflow-hidden rounded-2xl bg-elevated p-3 ring ring-inset ring-muted">
                <div class="origin-left scale-[0.82] sm:scale-[0.9]">
                  <Pickups />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
