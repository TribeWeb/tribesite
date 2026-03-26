<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #top>
      <UContainer>
        <div class="flex flex-col gap-6 py-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl space-y-3">
            <p class="text-2xl font-semibold text-primary sm:text-3xl">
              TribeWeb builds custom digital work that fits the subject.
            </p>
            <p class="text-muted">
              Websites and applications for technical products, specialist services and teams that need more than a template.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <UButton
              color="neutral"
              variant="subtle"
              to="mailto:hello@tribeweb.co.uk"
              target="_blank"
              icon="i-lucide-mail"
            >
              hello@tribeweb.co.uk
            </UButton>
            <UButton
              color="primary"
              trailing-icon="i-lucide-arrow-right"
              to="/projects"
            >
              Explore projects
            </UButton>
          </div>
        </div>
      </UContainer>
    </template>
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      Built with Nuxt and custom UI components.
    </template>
  </UFooter>
</template>
