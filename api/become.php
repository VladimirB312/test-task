<?php
require_once "./bdtools.php";
require_once "./getJsonData.php";

$conn = createDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

$data = getJsonData();

try {
    if ($method === "POST" && $data) {
        $companyData = [
            'name' => $data["name"],
            'phone' => $data["phone"],
            'email' => $data["email"],
            'description' => $data["description"]
        ];

        foreach ($companyData as $key => $value) {
            $companyData[$key] = $conn->real_escape_string($value);
        }

        if (strlen($companyData['name']) < 1 ||
            strlen($companyData['phone']) < 1 ||
            strlen($companyData['email']) < 1 ||
            strlen($companyData['description']) < 1) {
            throw new Exception('Введите все данные!');
        }

        if (existsEmailFromPartnersDB($conn, $companyData['email'])) {
            http_response_code(400);
            echo json_encode(["type" => "email_exists"]);
            exit;
        }

        insertCompanyData($conn, $companyData);
    }
} catch (Throwable $e) {
    http_response_code(400);
    echo $e->getMessage();
}