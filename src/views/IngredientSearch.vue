<template>
  <input
    type="search"
    class="form-input rounded focus:border-4 focus:border-waterway"
    placeholder="Ingredient search...."
    v-model="search_term"
  />
  <div v-if="errorMessage">
    <h1>{{ errorMessage }}</h1>
  </div>
  <div
    v-else
    class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-blue-green"
  >
    <IngredientCard
      v-for="(ingredient, index) in ingredients"
      :key="index"
      :name="ingredient.name"
      :image="ingredient.image"
      :id="ingredient.id"
    />
  </div>
</template>

<script>
// Helpers
import { watch, ref } from "vue";
// Components
import IngredientCard from "../components/IngredientCard.vue";
// Composables
import useDebouncedRef from "../composables/useDebounceRef";
// Services
import { ingredientSearch } from "../services/SpoonacularIngredientService";
import { ingredient_search_params } from "../services/SpoonacularIngredientService";

export default {
  props: {},
  components: {
    IngredientCard,
  },
  setup() {
    const search_term = useDebouncedRef("", 1000);
    const ingredients = ref([]);
    const errorMessage = ref("");
    let search_params = ref({ ...ingredient_search_params });

    watch(search_term, (new_search_term) => {
      ingredients.value = [];
      ingredientSearch(new_search_term, search_params.value)
        .then((response) => {
          ingredients.value = response.data.results;
          reset();
        })
        .catch((error) => {
          console.log(search_params);
          errorMessage.value = error.message;
          reset();
        });
    });

    function reset() {
      search_params = ref({ ...ingredient_search_params });
    }

    return { search_term, ingredients, errorMessage, search_params };
  },
};
</script>
