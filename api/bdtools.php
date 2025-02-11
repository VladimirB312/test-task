<?php
const HOST = 'localhost';
const USERNAME = 'root';
const PASSWORD = '';
const DATABASE = 'partners';

function createDBConnection(): mysqli
{
    $conn = new mysqli(HOST, USERNAME, PASSWORD, DATABASE);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error) . '<br/>';
    }
    return $conn;
}

function closeDBConnection(mysqli $conn): void
{
    $conn->close();
}

function existsEmailFromPartnersDB(mysqli $conn, $email): bool
{
    $sql = "SELECT * FROM company WHERE email = '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        return true;
    }

    return false;
}

function existsEmailFromSubscribersDB(mysqli $conn, $email): bool
{
    $sql = "SELECT * FROM subscribers WHERE email = '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        return true;
    }

    return false;
}

function insertCompanyData(mysqli $conn, $companyData)
{
    $query = "INSERT INTO company
    SET 
      company_name = '{$companyData['name']}',
      phone = '{$companyData['phone']}',
      email = '{$companyData['email']}',
      description = '{$companyData['description']}'";

    if (!$conn->query($query)) {
        throw new Error($conn->error);
    }
}

function insertSubscriberEmail(mysqli $conn, $email)
{
    $query = "INSERT INTO subscribers
    SET       
      email = '$email'";

    if (!$conn->query($query)) {
        throw new Error($conn->error);
    }
}

function getCompanyDataFromDB(mysqli $conn, $email)
{
    $query = "SELECT * FROM company WHERE email = '$email'";

    $result = $conn->query($query);

    if ($result->num_rows == 1) {
        return $result->fetch_assoc();
    }

    return null;
}