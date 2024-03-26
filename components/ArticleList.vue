<template>
  <section class="blog text-gray-700 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        <div
          v-for="article of props.articles"
          :key="_key"
          class="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto"
        >
        <!-- {{ slug }} -->
          <NuxtLink
            v-if="article.img"
            :to="`${article._path}`"
            class="image-box bg-gray-300 h-56 w-full overflow-hidden relative rounded-lg shadow-md"
          >
            <img
              :src="article.img"
              class="fg w-full z-10 pt-1 border-none absolute object-contain"
            />
            <img
              :src="article.img"
              class="bg w-full h-full absolute object-cover"
            />
          </NuxtLink>
          <div
            class="w-full bg-white -mt-10 shadow-lg z-0 rounded-lg overflow-hidden p-5"
          >
            <div class="header-content inline-flex">
              <div
                class="category-badge flex-1 h-4 w-4 m rounded-full m-1 bg-purple-100"
              >
                <div class="h-2 w-2 rounded-full m-1 bg-purple-500" />
              </div>
              <NuxtLink
                :to="{
                  name: 'category-category',
                  params: { category: article.category },
                }"
              >
                <div class="category-title flex-1 text-sm uppercase">
                  {{ article.category }}
                </div>
              </NuxtLink>
            </div>
            <NuxtLink :to="`${article._path}`">
              <div class="title-post font-bold">
                {{ article.title }}
              </div>
            </NuxtLink>
            <div class="summary-post text-base text-justify">
              <div class="flex flex-row justify-between mt-4">
                <NuxtLink
                  :to="`${article._path}`"
                >
                  <button
                    class="bg-blue-100 text-blue-500 block rounded p-2 text-sm"
                  >
                    <span class="font-medium">Read more</span>
                  </button>
                </NuxtLink>
                <NuxtLink
                  :to="{
                    name: 'author-author',
                    params: { author: article.author },
                  }"
                >
                  <div class="title-post m-2 font-light">
                    {{ article.author }}
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
	articles: {
		type: Object,
		required: true
	},
})

</script>

<style lang="scss" scoped>
.image-box {
  img.bg {
    filter: brightness(0.8) blur(15px);
  }
  img.fg {
    height: calc(100% - 2.5rem - 0.5rem);
  }
}
</style>
