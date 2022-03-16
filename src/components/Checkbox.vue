<template lang="pug">
label.checkbox
  input.checkbox__control(
    type="checkbox"
    :checked="isChecked"
    @click="onClick"
  )
  i.checkbox__ico(:class="isMinus && 'checkbox__ico--minus'" )
  span.checkbox__content
    slot(name="default")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Checkbox",
  props: {
    modelValue: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
    value: {
      type: String,
    },
    options: {
      type: Set as PropType<Set<string>>,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    isChecked() {
      return this.options
        ? this.modelValue.size
        : this.modelValue.has(this.value as string);
    },
    isMinus() {
      return !!(
        this.options &&
        this.modelValue.size &&
        this.modelValue.size !== this.options.size
      );
    },
  },
  methods: {
    onClick() {
      if (this.options?.size) {
        switch (this.modelValue.size) {
          case this.options.size:
            this.$emit("update:modelValue", new Set());
            break;
          case 0:
            this.$emit("update:modelValue", new Set([...this.options]));
            break;
          default:
            this.$emit("update:modelValue", new Set());
            break;
        }
      } else {
        this.modelValue[
          this.modelValue.has(this.value as string) ? "delete" : "add"
        ](this.value as string);
        this.$emit("update:modelValue", this.modelValue);
      }
    },
  },
});
</script>
