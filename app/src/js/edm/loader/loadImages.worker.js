self.addEventListener("message", data => {
  const images = data.data;

  let file;

  images.forEach(item => {
    file = `../../../assets/64-64/${item.IDImage}.webp`;

    const res = require(`../../../assets/64-64/${item.IDImage}.webp`);

    self.postMessage({ res, item });
  });
  self.close();
});
