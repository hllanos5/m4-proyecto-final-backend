-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2024 a las 21:42:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `modulo4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_chat`
--

CREATE TABLE `cliente_chat` (
  `id` int(11) NOT NULL,
  `incidencia_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `tipo` enum('Cliente','Soporte') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id` int(11) NOT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('Abierta','En Progreso','Cerrada') DEFAULT 'Abierta',
  `prioridad` enum('Baja','Media','Alta') DEFAULT 'Media',
  `fecha_incidencia` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_cierre` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencia`
--

INSERT INTO `incidencia` (`id`, `usuario_id`, `titulo`, `descripcion`, `estado`, `prioridad`, `fecha_incidencia`, `fecha_cierre`) VALUES
(1, 1, 'Titulo3', 'Descripcion2', 'En Progreso', 'Media', '2024-10-02 18:18:06', '2024-10-02 18:18:06'),
(2, 1, 'Titulo2', 'Descripcion2', 'Abierta', 'Baja', '2024-10-02 20:59:07', '2024-10-02 20:59:07'),
(3, 1, 'Titulo2', 'Descripcion2', 'Abierta', 'Baja', '2024-10-03 22:53:32', '2024-10-03 22:53:32'),
(4, 1, 'asdad', 'asdadsa', 'Abierta', 'Media', '2024-10-07 15:43:18', '2024-10-07 15:43:18'),
(5, 1, 'asdasdas', 'asdsad', 'Abierta', 'Media', '2024-10-07 15:43:39', '2024-10-07 15:43:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia_seguimiento`
--

CREATE TABLE `incidencia_seguimiento` (
  `id` int(11) NOT NULL,
  `incidencia_id` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `estado` enum('Abierta','En Progreso','Cerrada') DEFAULT 'Abierta',
  `comentario` text DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencia_seguimiento`
--

INSERT INTO `incidencia_seguimiento` (`id`, `incidencia_id`, `fecha`, `estado`, `comentario`, `usuario_id`) VALUES
(1, 1, '2024-10-07 08:18:44', 'Abierta', 'Comentario 2', 2),
(2, 1, '2024-10-07 09:11:47', 'Abierta', '<p>Holad</p>', 2),
(3, 1, '2024-10-07 09:13:15', 'Abierta', '<p>Holadfffdfdf</p>', 1),
(4, 1, '2024-10-07 09:20:50', 'Abierta', '<p><strong>este es mi comentario</strong></p>', 1),
(6, 1, '2024-10-07 09:39:06', 'Abierta', '<p>esto es una pruebaasdadasdadasdaasdadasdadad</p>', 1),
(7, 1, '2024-10-07 09:40:54', 'Abierta', '<p>dfsfsdfsfsdf</p>', 1),
(8, 1, '2024-10-07 09:43:02', 'Abierta', '<p>Hola 23</p>', 1),
(9, 1, '2024-10-07 09:43:22', 'Abierta', '<p>hol 1111</p>', 1),
(10, 1, '2024-10-07 09:43:52', 'Abierta', '<p>12312321321</p>', 1),
(11, 1, '2024-10-07 09:44:09', 'Abierta', '<p>12312321321123131dsfsdfsfsssfsdfsfsfsfsffsfssdfsdfsdsfsf</p>', 1),
(12, 1, '2024-10-07 09:49:43', 'Abierta', '<p>otro</p>', 1),
(13, 1, '2024-10-07 09:50:22', 'Abierta', '<p>asdasd</p>', 1),
(14, 1, '2024-10-07 09:50:30', 'Abierta', '<p>asdasd</p>', 1),
(15, 1, '2024-10-07 09:51:14', 'Abierta', '<p>asdsad</p>', 1),
(16, 1, '2024-10-07 09:51:19', 'Abierta', '<p>Hola 123</p>', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `paterno` varchar(60) DEFAULT NULL,
  `materno` varchar(60) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `rol` enum('RESIDENTE','ADMIN') DEFAULT 'RESIDENTE',
  `imagen` varchar(100) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `paterno`, `materno`, `telefono`, `correo`, `password`, `rol`, `imagen`, `create_at`, `update_at`) VALUES
(1, 'Hans', 'Llanos', 'Chavez', '961287931', 'hans.llanos@gmail.com', '$2b$10$mZOG3Uj5jbYLFoDNBQP75ugieSXnfH6Kwl7TxxsGmC9yiQNTg4XTK', 'ADMIN', 'imagen.jpg', '2024-10-03 18:09:31', '2024-10-07 14:23:15'),
(2, 'juecho', 'juecho', 'juecho', '961287931', 'josue.huancapaza@gmail.com', '$2b$10$g1072/EBVL8BaxvdBVAcTux6xbfN/Be/w6y3DRxuFTV6YQ0v49wT.', 'RESIDENTE', 'imagen.jpg', '2024-10-03 23:22:28', '2024-10-03 23:22:28'),
(4, 'Hans22', 'Llanos', 'Chavez', '992852285', 'hans.llanos2@gmail.com', '$2b$10$36/ix2ZHCTsU9Z1vh5yPP.r2nRJplQjSfffW8wMh0Hcz.Ej70hGHq', 'RESIDENTE', 'imagen.jpg', '2024-10-07 17:39:12', '2024-10-07 17:39:12'),
(5, 'residente', 'residente', 'residente', '961287931', 'residente@gmail.com', '$2b$10$jT..GzH/15MiJumPg.cMOOSjHV6rAGDqaTdLdDZMLLwwqMCoJ8GHW', 'RESIDENTE', 'imagen.jpg', '2024-10-07 18:33:50', '2024-10-07 18:33:50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente_chat`
--
ALTER TABLE `cliente_chat`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `incidencia_seguimiento`
--
ALTER TABLE `incidencia_seguimiento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente_chat`
--
ALTER TABLE `cliente_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `incidencia_seguimiento`
--
ALTER TABLE `incidencia_seguimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
