<template>
  <div class="p-6">
    <div class="container mx-auto">
      <div v-if="isLoading" class="flex justify-center items-center h-full">
        <div class="loader"></div>
      </div>
      <div v-else>
        <h1 class="text-3xl font-bold mb-4">{{ fund.name }}</h1>
        <div class="mb-4 mt-9">
          <strong class="text-xl">Composition:</strong>
          <ul class="list-disc pl-6">
            <li v-for="(value, key) in fund.composition" :key="key">{{ key }}: {{ value }}%</li>
          </ul>
        </div>
        <div class="mb-4">
          <strong class="text-xl">Custodian:</strong>
          <p>{{ fund.custodian }}</p>
        </div>
        <div class="mb-4">
          <strong class="text-xl">Description:</strong>
          <p>{{ fund.description }}</p>
        </div>
        <div class="mb-4">
          <strong class="text-xl">Performance:</strong>
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">Year</th>
                <th class="px-4 py-2">Annual Return</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="performance in fund.performance" :key="performance.year">
                <td class="border px-4 py-2">{{ performance.year }}</td>
                <td class="border px-4 py-2">
                  {{ (performance.annual_return * 100).toFixed(2) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          @click="goBack"
          class="bg-cowrywise hover:bg-cowrywise text-white font-bold py-2 px-4 rounded mt-9"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FundDetails',
  data() {
    return {
      fund: {},
      isLoading: true
    }
  },
  created() {
    this.fundDetails()
  },
  methods: {
    async fundDetails() {
      await this.$store.dispatch('fetchUsers')
      const fundId = this.$route.params.id
      let users = this.getUsers
      const fundDetails = users.find((fund) => fund.id === fundId)
      console.log('fund', fundDetails)
      this.fund = fundDetails
      this.isLoading = false
    },
    goBack() {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['getUsers'])
  }
}
</script>

<style scoped>
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
