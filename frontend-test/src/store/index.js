import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        users: [],
    },
    getters: {
        getUsers: (state) => state.users,
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const response = await axios.get(
                    'https://dashboard.cowrywise.com/api/v2/funds/public/'
                );
                console.log(response.data); // Log the data to see its structure
                commit('SET_USERS', response.data.data); // Access the nested data array
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
    },
});
