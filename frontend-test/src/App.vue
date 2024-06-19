<template>
  <div class="flex">
    <!-- Side Navigation -->
    <nav class="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div class="py-4 px-6">
        <h1 class="text-2xl font-bold">Side Nav</h1>
      </div>
      <ul class="flex-grow">
        <li class="py-2 px-6 hover:bg-gray-700">
          <a href="#">Dashboard</a>
        </li>
        <li class="py-2 px-6 hover:bg-gray-700">
          <a href="#">Users</a>
        </li>
        <li class="py-2 px-6 hover:bg-gray-700">
          <a href="#">Settings</a>
        </li>
        <!-- Add more nav items as needed -->
      </ul>
      <div class="py-4 px-6">
        <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-grow p-6">
      <div class="container mx-auto">
        <!-- Filter Input -->
        <div class="mb-4">
          <input
            type="text"
            v-model="filter"
            @input="applyFilter"
            placeholder="Filter by name..."
            class="p-2 border border-gray-300 rounded"
          />
        </div>

        <!-- Table -->
        <table v-if="filteredUsers.length" class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 bg-gray-200 text-gray-600 font-bold">ID</th>
              <th class="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Name</th>
              <th class="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Fund Code</th>
              <th class="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Returns</th>
              <th class="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Logo</th>
              <th class="py-2 px-4 bg-gray-200 text-gray-600 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-100">
              <td class="py-2 px-4 border-b">{{ user.id }}</td>
              <td class="py-2 px-4 border-b">{{ user.name }}</td>
              <td class="py-2 px-4 border-b">{{ user.fund_code }}</td>
              <td class="py-2 px-4 border-b">{{ user.returns }}</td>
              <td class="py-2 px-4 border-b">
                <img :src="user.logo" alt="User Logo" class="max-w-12 h-auto" />
              </td>
              <td class="py-2 px-4 border-b">
                <button
                  @click="seeMore(user)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  See More
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No users found.</div>

        <!-- Pagination Controls -->
        <div class="mt-4 flex justify-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
          >
            Previous
          </button>
          <span class="px-4 py-2 mx-1">{{ currentPage }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
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
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    filteredUsers() {
      if (!this.filter) {
        return this.getUsers
      }
      return this.getUsers.filter((user) =>
        user.name.toLowerCase().includes(this.filter.toLowerCase())
      )
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
    this.$store.dispatch('fetchUsers')
  },
  methods: {
    seeMore(user) {
      // Handle the action when the "See More" button is clicked.
      // This could involve navigating to another page, showing a modal, etc.
      console.log('See more for user:', user)
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

<style scoped>
/* Optional scoped styles */
</style>
