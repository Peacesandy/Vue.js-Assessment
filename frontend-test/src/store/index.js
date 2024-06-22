import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        users: [],
        fund: {}
    },
    getters: {
        getUsers: (state) => state.users,
        getFund: state => state.find((fund) => fund.id === fundId)

    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const response = await axios.get(
                    'https://dashboard.cowrywise.com/api/v2/funds/public/'
                );
                console.log(response.data);
                commit('SET_USERS', response.data.data);
            } catch (error) {
                alert(error);
                console.log('Error fetching users:', error);
            }
        },
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        setFund(state, fund) {
            state.fund = fund;
        }
    },
});
