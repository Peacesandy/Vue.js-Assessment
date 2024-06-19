<template>
  <div class="flex">
    <nav class="w-64 h-screen bg-cowrywise text-white flex flex-col">
      <div class="py-4 px-6">
        <img src="\cowrywise.png" alt="Cowrywise Logo" class="w-[200px] h-auto" />
        <h1 class="text-1xl font-bold pt-12">Investment Funds</h1>
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
      </ul>
      <div class="py-4 px-6">
        <button class="w-full bg-white hover:bg-white text-cowrywise font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </nav>

    <div class="flex-grow p-12">
      <div class="container mx-auto">
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
                <button
                  @click="seeMore(user)"
                  class="bg-cowrywise hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  See More
                </button>
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
      itemsPerPage: 10
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
    this.$store.dispatch('fetchUsers')
  },
  methods: {
    seeMore(user) {
      if (this.$router) {
        console.log('Navigating to:', `/fund/${user.id}`)
        this.$router.push(`/fund/${user.id}`)
      } else {
        console.error('Router is not available')
      }
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
