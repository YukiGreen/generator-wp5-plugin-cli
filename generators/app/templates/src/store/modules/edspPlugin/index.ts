import * as types from "../../mutation-types";
import { ActionTree, MutationTree, Commit } from "vuex";
import { EdspHelloModuleService } from '../../../services';

export interface State {
  listData: any[];
  loading: boolean;
  helloName: string;
}

const initState: State = {
  listData: [],
  loading: true,
  helloName: 'Hello friend'
};

// getters
const getters = {
  getUserNum(state: State): any {
    return state.listData.length;
  },
  getList(state: State): any {
    return state.listData;
  },
};

// mutations
const mutations: MutationTree<State> = {
  [types.SET_HELLO_DATA](state: State, data: any) {
    state.listData = data;
  },
  [types.SET_HELLO_LOADING](state: State, flag: boolean) {
    state.loading = flag;
  },
  [types.SET_HELLO_NAME](state: State, name: string) {
    state.helloName = name;
  },
};

// actions
const actions: ActionTree<State, any> = {
  async getUsers(context: { commit: Commit; state: State }) {
    context.state.loading = true;
    try {
      const res = await EdspHelloModuleService.getList();
      if (res && res.code === 200 && res.data) {
        context.commit(types.SET_HELLO_DATA, res.data);
      }
    } catch (e) {
      context.commit(types.SET_HELLO_LOADING, false);
    }
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations
};
