<template>
  <div class="flex-grow p-12">
    <div class="container mx-auto">
      <div v-if="isLoading" class="flex justify-center items-center h-full">
        <div class="loader"></div>
      </div>
      <div v-else>
        <div class="mb-4 flex items-center">
          <input
            type="text"
            v-model="filter"
            @input="applyFilter"
            placeholder="Filter by name..."
            class="p-2 border border-gray-300 rounded"
          />
          <select
            v-model="riskFilter"
            @change="applyFilter"
            class="p-2 border border-gray-300 rounded ml-auto pl-2 pr-6"
          >
            <option value="">All Risk Levels</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>

        <table v-if="filteredUsers.length" class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Name</th>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Returns</th>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Asset Type</th>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Fund Manager</th>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Risk Level</th>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Logo</th>
              <th class="py-2 pr-14 pl-1 bg-cowrywise text-white font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-100">
              <td class="py-2 px-4 border-b">{{ user.name }}</td>
              <td class="py-2 px-4 border-b">{{ user.returns }}</td>
              <td class="py-2 px-4 border-b">{{ user.fundtype }}</td>
              <td class="py-2 px-4 border-b">{{ user.fund_manager }}</td>
              <td class="py-2 px-4 border-b">{{ user.risk }}</td>
              <td class="py-2 px-4 border-b">
                <img :src="user.logo" alt="User Logo" class="max-w-12 h-auto" />
              </td>
              <td class="py-2 px-4 border-b">
                <router-link
                  :to="`/fund/${user.id}`"
                  class="bg-cowrywise hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >See More</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No users found.</div>

        <div class="mt-4 flex justify-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 mx-1 bg-cowrywise hover:bg-cowrywise text-white font-bold rounded"
          >
            Previous
          </button>
          <span class="px-4 py-2 mx-1">{{ currentPage }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 mx-1 bg-cowrywise hover:bg-cowrywise text-white font-bold rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserList',
  data() {
    return {
      filter: '',
      riskFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    filteredUsers() {
      let users = this.getUsers

      if (this.filter) {
        users = users.filter((user) => user.name.toLowerCase().includes(this.filter.toLowerCase()))
      }

      if (this.riskFilter) {
        users = users.filter((user) => user.risk == this.riskFilter)
      }

      return users
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    }
  },
  created() {
    this.$store.dispatch('fetchUsers').then(() => {
      this.isLoading = false
    })
  },
  methods: {
    seeMore(user) {
      this.$router.push(`/fund/${user.id}`)
    },
    applyFilter() {
      this.currentPage = 1
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>

<style>
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
