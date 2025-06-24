<script setup lang="ts">
const { PolicyMain, addRule, addGroup } = usePolicyEditor()

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
})
</script>

<template>
  <div v-if="mounted" class="max-w-[1300px] mx-auto pt-10">
    <ConditionsEditorGroup :policy-main="PolicyMain" @add-rule="addRule" @add-group="addGroup" />
  </div>
</template>

<style scoped lang="scss"></style>
