<script setup lang="ts">
import { core } from '@/core/core';

const props = defineProps<{
    focused: boolean,
    key: Parameters<typeof core.userConfig.get>[0]
}>();

</script>
<template>
    <div>
        
    </div>
</template>
<style>
</style>