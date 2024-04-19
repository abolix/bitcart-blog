<template>
  <div>
    <ul class="flex flex-wrap mb-4 text-center pt-5">
      <li
        v-for="category of categories"
        :key="category.name"
        class="xs:w-full md:w-1/6 px-2 text-center"
      >
        <NuxtLink :to="`category/${category.name}`" class="">
          <p
            class="font-bold text-gray-600 uppercase tracking-wider text-ss"
          >
            {{ category.name }}
          </p>
        </NuxtLink>
      </li>
    </ul>
    <ArticleList :articles="articles" />
  </div>
</template>

<script setup>
  const articles = await queryContent('articles')
    .only(["title", "img", "_path", "author", "category", ])
    .sort({ createdAt: -1})
    .find()

    // _path is like "/articles/bitcartcc-whmcs-plugin-is-out" we wanna remove /articles/ from it
    articles.forEach((article) => {
      article._path = article._path.replace("/articles", "")
    })


    const categories = await queryContent("categories")
      .only(["name"])
      .sort({ name: 1 })
      .find()
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
