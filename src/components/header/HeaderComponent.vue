<script setup>
import LogoComponent from "@/components/logo/LogoComponent.vue";
import LoginButton from "@/components/login/LoginButton.vue";
import RegisterButton from "@/components/register/RegisterButton.vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const userSession = computed(() => authStore.currentUser);

const isInDashboard = computed(() => {
  return route.path.startsWith("/admin") || route.path.startsWith("/dashboard");
});

function handleLogout() {
  authStore.logout();
  router.push("/");
}
</script>

<template>
  <header class="header">
    <LogoComponent />
    
    <div class="d-flex align-items-center gap-2">
      
      <template v-if="!userSession">
        <LoginButton />
        <RegisterButton label="Crear cuenta" />
      </template>

      <template v-else-if="isInDashboard">
        <RouterLink to="/" class="btn-back-home">
          ← Volver al sitio
        </RouterLink>
        <button @click="handleLogout" class="btn-logout">
          Salir
        </button>
      </template>

      <template v-else>
        <RouterLink 
          :to="userSession.role === 'admin' ? '/admin/destacados' : '/dashboard/favoritos'" 
          class="btn-dashboard"
        >
          Dashboard
        </RouterLink>
        <button @click="handleLogout" class="btn-logout">
          Salir
        </button>
      </template>

    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  min-height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #dde2ea;
  position: sticky;
  top: 0;
  z-index: 100;
}

.btn-back-home {
  text-decoration: none;
  color: #4b5563;
  font-size: 0.95rem;
  font-weight: 500;
  margin-right: 12px;
  transition: color 0.2s;
  &:hover { color: #111827; }
}

.btn-dashboard {
  text-decoration: none;
  color: #111827;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 6px 12px;
  &:hover { opacity: 0.8; }
}

.btn-logout {
  background: white;
  border: 1px solid #dde2ea;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  &:hover {
    background: #f9fafb;
    border-color: #cbd5e1;
  }
}
</style>
