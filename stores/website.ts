export const useWebsiteStore = defineStore("websiteStore", {
  state: () => ({
    answer: false,
  }),
  actions: {
    onSetAnswer() {
      if (!this.answer) this.answer = true;
    },
  },
});
