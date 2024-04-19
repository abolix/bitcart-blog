<template>
  <div>
    <header class="pt-6 xl:pb-10">
      <div class="space-y-1 text-center">
        <dl class="space-y-10">
          <div>
            <dt class="sr-only">Published on</dt>
            <dd class="text-base leading-6 font-medium text-gray-500">
              <p>{{ formatDate(article.createdAt) }}</p>
            </dd>
          </div>
        </dl>
        <div>
          <h1
            class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            {{ article.title }}
          </h1>
        </div>
      </div>
    </header>
    <div class="prose prose-lg mx-auto">
      <ContentRenderer :value="article"/>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const article = await queryContent("articles", route.params.slug[0]).findOne()

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(date).toLocaleDateString("en", options)
}
</script>