export async function preloadAssets(urls = []) {
  const images = urls.map(
    (url) =>
      new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve({ url, ok: true });
        image.onerror = () => resolve({ url, ok: false });
        image.src = url;
      }),
  );

  return Promise.all(images);
}
