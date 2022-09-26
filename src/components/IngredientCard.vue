<template>
  <div class="card shadow-xl bg-smog hover:border-4 hover:border-waterway">
    <div class="flex justify-center flex-col">
      <img
        class="card-img mix-blend-multiply"
        :src="image_url"
        alt="image of food ingredient"
        data-cy="ingredient-image"
      />
      <div
        class="two-lines text-center font-shadowsIntoLight"
        data-cy="ingredient-name"
      >
        {{ ingredient_name }}
      </div>
    </div>
    <div data-cy="ingredient-question">
      <QuestionMarkCircleIcon
        class="card-button text-blue-green float-left hover:text-waterway"
        @mouseover="hovering"
        @mouseleave="not_hovering"
      ></QuestionMarkCircleIcon>
    </div>
    <div data-cy="ingredient-plus">
      <PlusCircleIcon
        class="card-button text-blue-green float-right hover:text-waterway"
      ></PlusCircleIcon>
    </div>
  </div>
  <ModalGeneral v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      NUTRITIONAL INFORMATION - {{ ingredient_name.toUpperCase() }} SERVING
      {{ weight_per_serving }}
    </template>
    <template v-slot:body>
      <DonutChart
        v-if="
          caloric_balance_data[0] > 0 ||
          caloric_balance_data[1] > 0 ||
          caloric_balance_data[2] > 0
        "
        class="mx-auto w-1/2"
        :labels="caloric_balance_labels"
        :data="caloric_balance_data"
      ></DonutChart>
      <div class="grid grid-cols-10 gap-2 w-full overflow-hidden">
        <div
          class="col-span-2 flex justify-center w-full pl-20 h-5 whitespace-nowrap overflow-ellipsis"
        >
          Nutrient Name
        </div>
        <div
          class="col-span-8 flex justify-center w-full pl-20 h-5 whitespace-nowrap overflow-ellipsis"
        >
          Percentage Daily Value%
        </div>
        <template
          v-for="(nutrient, index) in ingredient_nutritients"
          :key="index"
        >
          <div
            class="col-span-2 flex justify-center w-full pl-20 h-5 whitespace-nowrap overflow-ellipsis"
          >
            {{ nutrient.name }} - {{ nutrient.amount }} ({{ nutrient.unit }})
          </div>
          <div class="col-span-8 flex justify-center w-full">
            <div
              class="w-5/6 bg-blue-green rounded-full h-5 text-center text-blue-100"
            >
              <div
                class="bg-waterway h-5 text-l font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                :style="{
                  width: percentWidth(nutrient.percentOfDailyNeeds) + '%',
                }"
              >
                {{ nutrient.percentOfDailyNeeds }}%
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </ModalGeneral>
</template>

<script>
// Helpers
import { ref, computed } from "vue";
// Components
import {
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/20/solid";
import ModalGeneral from "./shared/ModalGeneral.vue";
import DonutChart from "./shared/DonutChart.vue";
// Services
import { ingredientInformation } from "../services/SpoonacularIngredientService";
import { ingredient_information_params } from "../services/SpoonacularIngredientService";

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: "Ingredients Name",
    },
    image: {
      type: String,
      required: true,
      default: "default",
    },
    id: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  components: {
    PlusCircleIcon,
    QuestionMarkCircleIcon,
    ModalGeneral,
    DonutChart,
  },
  setup(props) {
    const ingredient_name = ref(props.name);
    const ingredient_image = ref(props.image);
    const image_url = computed(
      () =>
        "https://spoonacular.com/cdn/ingredients_100x100/" +
        ingredient_image.value
    );
    const ingredient_nutritients = ref([]);
    const caloric_balance_labels = ref(["Protein", "Fat", "Carbs"]);
    const caloric_balance_data = ref([25, 40, 35]);
    const weight_per_serving = ref("");
    const get_info = ref(false);
    let information_params = ref({ ...ingredient_information_params });
    const isModalVisible = ref(false);

    function hovering() {
      if (!get_info.value) {
        // showModal();
        get_info.value = true;
        setTimeout(() => ingredient_information(), 1000);
      }
    }

    function not_hovering() {
      get_info.value = false;
    }

    function ingredient_information() {
      if (get_info.value) {
        ingredientInformation(props.id, information_params.value)
          .then((response) => {
            showModal();
            console.log(response.data);
            ingredient_nutritients.value = response.data.nutrition.nutrients;
            caloric_balance_labels.value = ["Protein %", "Fat %", "Carbs %"];
            caloric_balance_data.value = [
              response.data.nutrition.caloricBreakdown.percentProtein,
              response.data.nutrition.caloricBreakdown.percentFat,
              response.data.nutrition.caloricBreakdown.percentCarbs,
            ];
            weight_per_serving.value = `(${response.data.nutrition.weightPerServing.amount} ${response.data.nutrition.weightPerServing.unit})`;
            reset();
          })
          .catch((error) => {
            console.log("ERROR");
            console.log(information_params.value);
            console.log(error.message);
            reset();
          });
      }
    }

    function showModal() {
      isModalVisible.value = true;
    }

    function closeModal() {
      isModalVisible.value = false;
      ingredient_nutritients.value = [];
    }

    function percentWidth(value) {
      return value <= 100 ? value : 100;
    }

    function reset() {
      information_params = ref({ ...ingredient_information_params });
    }

    return {
      ingredient_name,
      ingredient_image,
      image_url,
      hovering,
      not_hovering,
      isModalVisible,
      showModal,
      closeModal,
      ingredient_nutritients,
      caloric_balance_labels,
      caloric_balance_data,
      weight_per_serving,
      percentWidth,
    };
  },
};
</script>
