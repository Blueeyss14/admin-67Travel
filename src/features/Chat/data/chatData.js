export const chatData = [
  {
    id: 1,
    name: "Felicia",
    profile: "/images/image1.jpg",
    lastMessage: "Saya ingin tahu status pesanan saya.",
    timestamp: "10:30 AM",
    messages: [
      {
        profile: "/images/image1.jpg",
        message: "Halo, saya butuh bantuan.",
        role: "Felicia",
        timestamp: "10:25 AM",
        isUser: true,
      },
      {
        profile: "/images/image1.jpg",
        message: "Halo! Ada yang bisa kami bantu?",
        role: "Mimin",
        timestamp: "10:26 AM",
        isUser: false,
      },
      {
        profile: "/images/image1.jpg",
        message: "Saya ingin tahu status pesanan saya.",
        role: "Felicia",
        timestamp: "10:30 AM",
        isUser: true,
      },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    profile: "/images/image2.png",
    lastMessage: "Terima kasih atas bantuannya!",
    timestamp: "09:15 AM",
    messages: [
      {
        profile: "/images/image2.png",
        message: "Selamat pagi!",
        role: "John Doe",
        timestamp: "09:00 AM",
        isUser: true,
      },
      {
        profile: "/images/image1.jpg",
        message: "Selamat pagi! Ada yang bisa dibantu?",
        role: "Mimin",
        timestamp: "09:05 AM",
        isUser: false,
      },
      {
        profile: "/images/image2.png",
        message: "Saya mau tanya tentang produk baru.",
        role: "John Doe",
        timestamp: "09:10 AM",
        isUser: true,
      },
      {
        profile: "/images/image1.jpg",
        message: "Tentu, produk baru kami sudah ready!",
        role: "Mimin",
        timestamp: "09:12 AM",
        isUser: false,
      },
      {
        profile: "/images/image2.png",
        message: "Terima kasih atas bantuannya!",
        role: "John Doe",
        timestamp: "09:15 AM",
        isUser: true,
      },
    ],
  },
  {
    id: 3,
    name: "Thalia Anggreny",
    profile: "/images/image3.jpg",
    lastMessage: "oke, saya tunggu konfirmasinya.",
    timestamp: "Yesterday",
    messages: [
      {
        profile: "/images/image3.jpg",
        message: "halo, aku mau konfirmasi booking.",
        role: "Thalia Anggreny",
        timestamp: "Yesterday, 14:20",
        isUser: true,
      },
      {
        profile: "/images/image1.jpg",
        message: "Baik, saya cek dulu ya.",
        role: "Mimin",
        timestamp: "Yesterday, 14:25",
        isUser: false,
      },
      {
        profile: "/images/image3.jpg",
        message: "oke, saya tunggu konfirmasinya.",
        role: "Thalia Anggreny",
        timestamp: "Yesterday, 14:30",
        isUser: true,
      },
    ],
  },
];

export function mapChat(rawData) {
  return rawData.map((item) => ({
    profile: item.profile,
    message: item.message,
    isUser: item.isUser,
    role: item.role,
    timestamp: item.timestamp,
  }));
}
