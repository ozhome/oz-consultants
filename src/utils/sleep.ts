export default async function sleep(time = 1000): Promise<void> {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
