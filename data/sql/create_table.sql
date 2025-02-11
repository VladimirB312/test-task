CREATE TABLE company
(
    `id`           INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `company_name` VARCHAR(36)  NOT NULL,
    `phone`        VARCHAR(255) NOT NULL,
    `email`        VARCHAR(255) NOT NULL,
    `description`  TEXT         NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE subscribers
(
    `id`           INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email`        VARCHAR(255) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_unicode_ci;