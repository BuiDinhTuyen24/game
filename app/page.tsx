import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-5xl font-bold mb-6 text-red-500">ĐỪNG ĐỂ TIỀN RƠI</h1>
      <h2 className="text-2xl mb-8">STOCK MARKET EDITION (NFLX)</h2>
      <p className="max-w-2xl text-gray-300 mb-12">
        Game có 9 vòng chơi, tương ứng với 9 sự kiện lịch sử thật của Netflix (2017 - 2024). 
        Bạn bắt đầu với $10,000 và 20 cổ phiếu NFLX. Chọn BUY, HOLD, hoặc SELL để tối đa hóa tài sản!
      </p>
      <Link href="/room/lobby" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors">
        Vào Phòng Chơi
      </Link>
    </main>
  )
}