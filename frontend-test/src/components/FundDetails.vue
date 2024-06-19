<template>
  <div class="p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ fund.name }}</h1>
      <div class="mb-4"><strong>Composition:</strong> {{ fund.composition }}</div>
      <div class="mb-4"><strong>Custodian:</strong> {{ fund.custodian }}</div>
      <div class="mb-4"><strong>Description:</strong> {{ fund.description }}</div>
      <div class="mb-4"><strong>Performance:</strong> {{ fund.performance }}</div>
      <div class="mb-4"><strong>Other Details:</strong> {{ fund.otherDetails }}</div>
      <button
        @click="goBack"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FundDetails',
  data() {
    return {
      fund: {}
    }
  },
  created() {
    const fundId = this.$route.params.id
    this.fetchFundDetails(fundId)
  },
  methods: {
    fetchFundDetails(fundId) {
      this.$store.dispatch('fetchFundDetails', fundId).then((fund) => {
        this.fund = fund
      })
    },
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped></style>
