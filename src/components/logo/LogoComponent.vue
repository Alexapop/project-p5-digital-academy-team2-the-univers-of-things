<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <RouterLink to="/" class="logo">
        <span class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><g stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.667" clip-path="url(#a)"><path d="M9.18 2.345a.833.833 0 0 1 1.639 0l.876 4.632a1.67 1.67 0 0 0 1.328 1.328l4.632.876a.833.833 0 0 1 0 1.638l-4.632.876a1.67 1.67 0 0 0-1.328 1.328l-.876 4.632a.833.833 0 0 1-1.638 0l-.876-4.632a1.67 1.67 0 0 0-1.328-1.328l-4.632-.876a.833.833 0 0 1 0-1.638l4.632-.876a1.67 1.67 0 0 0 1.328-1.328zM16.667 1.667V5M18.333 3.333H15M3.333 18.333a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>
        </span>
        <span class="logo-text">OtakuHub</span>
    </RouterLink>
</template>
<style lang="scss" scoped>
    .logo {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        color: inherit;
        cursor: pointer;

        &-icon {
            width: 36px;
            height: 36px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #7c4dff, #b766f2);
        }

        &-text {
            font-size: 20px;
            font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
            line-height: 1.4;
            font-weight: 700;
        }
    }
</style>
