export const useSayHello = (name: string) => {
  return (overwritename?: string) => {
    console.log(`Hello ${overwritename || name}`);
  };
};
