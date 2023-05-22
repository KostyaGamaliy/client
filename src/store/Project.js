import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
	state: () => ({
		pdfPath: null,
	}),
	getters: {
		getPdfPath: (state) => state.pdfPath,
	},
	mutations: {
		setPdfPath(state, val) {
			state.pdfPath = val;
		},
	},
	actions: {
		storePdfPath({ commit }, value) {
			commit("setPdfPath", value);
		},
	},
	persist: true,
});