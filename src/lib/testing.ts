// Helper to test async functions
export async function wait(duration: number) {
  return new Promise<void>((res) => {
    setTimeout(() => res(), duration);
  });
}
