CREATE TABLE `Lock` (
         `id` int(200) NOT NULL AUTO_INCREMENT,
         `macid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
        `lockname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         PRIMARY KEY (`id`),
         FOREIGN KEY(`id`) REFERENCES `User`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


    CREATE TABLE `User` (
        `id` int(200) NOT NULL AUTO_INCREMENT,
        `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
         `birthDate` DATE NOT NULL,
         PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
