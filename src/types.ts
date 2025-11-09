export type VScodeAPI = {
  getState: () => undefined;
  setState: (state: Record<string, any>) => void;
  pushMessage: (message: string) => void;
};
