<template>
  <div
    class="fixed inset-0 w-full h-full backdrop-blur-sm backdrop-grayscale-0 bg-white/30 flex justify-center items-center z-40"
    @click="close"
  >
    <div
      class="bg-smog shadow-xl flex flex-col border-8 border-blue-green w-3/5 h-5/6 rounded-2xl font-shadowsIntoLight overflow-scroll z-50"
      @click.stop
    >
      <header class="relative flex p-4 justify-center">
        <slot name="header">This is the default title!</slot>
      </header>

      <section class="relative px-15 flex-col w-full justify-center">
        <slot name="body">This is the default body!</slot>
      </section>

      <footer class="flex flex-col p-4 justify-center">
        <section class="relative px-15 flex justify-center">
          <slot name="footer"></slot>
        </section>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    function close() {
      emit("close");
    }

    return {
      close,
    };
  },
};
</script>
