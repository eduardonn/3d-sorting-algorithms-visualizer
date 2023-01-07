interface UIApi {
  animSpeed: number;
  handleSortButton: (algorithmOption: string) => Promise<unknown>;
  handleRandomizeButton: () => Promise<unknown>;
}

const api: UIApi = {
  animSpeed: 1,
  async handleSortButton(algorithmOption) { console.warn('Sort button behavior not defined') },
  async handleRandomizeButton() { console.warn('Randomize button behavior not defined') },
}

export const useUI = () => {
  return api;
}