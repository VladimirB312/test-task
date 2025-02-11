<?php
function getJsonData()
{
    $dataAsJson = file_get_contents("php://input");
    $data = json_decode($dataAsJson, true);

    return $data ?? null;
}