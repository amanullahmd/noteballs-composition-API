<template>
  <div class="my-2">
    <div class="field card">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="textAreaRef"
            :value="modelValue"
            :placeholder="placeholder"
          ></textarea>
        </div>
      </div>
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <slot name="buttons"> </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textAreaRef = ref(null)
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Type someting...'
  }
})

const emit = defineEmits(['update:modelValue'])

const focusTextArea = () => {
  textAreaRef.value.focus()
}

defineExpose({
  focusTextArea
})
</script>
