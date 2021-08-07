-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Agu 2021 pada 07.40
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `cart_count` int(11) NOT NULL,
  `cart_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`, `cart_count`, `cart_created_at`) VALUES
(8, 3, 8, 3, '2021-08-07 05:14:37'),
(9, 3, 9, 4, '2021-08-07 05:28:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(250) NOT NULL,
  `product_price` bigint(20) NOT NULL,
  `product_desc` text NOT NULL,
  `product_image` varchar(250) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `user_id`, `product_name`, `product_price`, `product_desc`, `product_image`, `product_created_at`, `product_updated_at`) VALUES
(7, 2, 'Samsung SMART TV', 200000, 'lorem ipsum dolor sit amet', '2021-08-06T02-06-35.840Zaplikasi-chatting.png', '2021-08-06 01:24:01', '2021-08-06 02:06:35'),
(8, 3, 'Samsung SMART TV 2', 250000, 'lorem ipsum dolor sit amet', '2021-08-06T01-44-30.044Zdownload.png', '2021-08-06 01:44:30', NULL),
(9, 3, 'Samsung SMART TV 3', 300000, 'lorem ipsum dolor sit amet', '2021-08-06T02-08-22.711Zdownload.png', '2021-08-06 02:08:22', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_city` varchar(150) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_city`, `user_created_at`) VALUES
(2, 'antono', 'antono@any.com', '$2b$10$o36DtUk96ODVNcs2Hs/9NenaHU4yr0nYMB0DpkK.ZMykmte4wjS6q', 'Yogyakarta', '2021-08-06 00:08:51'),
(3, 'antono', 'antono@any.com1', '$2b$10$eSi7ftmqfskjK4Y1OFed5O8LGYZLXvIN7S3yKNtjMIo3WR8RF9rmq', 'Yogyakarta', '2021-08-06 00:18:44');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
