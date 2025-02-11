<?php
require_once "./bdtools.php";
require_once "./getJsonData.php";

$conn = createDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

$data = getJsonData();

try {
    if ($method === "POST" && $data) {
        $email = $data['email'];
        $email = $conn->real_escape_string($email);

        if (strlen($email) < 1) {
            throw new Exception('Не введен email');
        }

        $companyData = getCompanyDataFromDB($conn, $email);

        if ($companyData) {
            echo json_encode($companyData);
        } else {
            echo json_encode(['error' => 'Компания не найдена']);
        }
    }
} catch (Throwable $e) {
    http_response_code(400);
    echo $e->getMessage();
}