export const carouselImageData = [
  {
    id: 1,
    bg: "/images/image1.jpg",
  },
  {
    id: 2,
    bg: "/images/image2.png",
  },
  {
    id: 3,
    bg: "/images/image3.jpg",
  },
  {
    id: 4,
    bg: "/images/image4.png",
  },
];

export function mapImg(rawData) {
  return rawData.map((item) => ({
    id: item.id,
    bg: item.bg,
  }));
}