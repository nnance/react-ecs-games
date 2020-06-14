export type Entity = {
  id: number;
};

const MAX_NUM = 100000;

export const createEntity = (): Entity => ({
  id: Math.floor(Math.random() * MAX_NUM),
});
