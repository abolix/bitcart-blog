<template>
  <div>
    <p class="font-bold uppercase tracking-wider text-3xl text-center">
      {{ category.name }}
    </p>
    <ArticleList :articles="articles" />
  </div>
</template>

<script setup>
      const route = useRoute()
      const category = await queryContent("categories", route.params.category).findOne()

      const articles = await queryContent("articles")
        .where({ category: { $eq: category.name } })
        .sort("createdAt", "desc")
        .find()


      articles.forEach((article) => {
        article._path = article._path.replace("/articles", "")
      })

</script>
