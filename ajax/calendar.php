<?php

include '../functions/functions.php';

$_POST = json_decode(file_get_contents('php://input'));
header('Content-Type: application/json');

function loadRequest($data)
{

    if(!empty($data->request))
    {

        if( function_exists($data->request) )
        {   

            $function = $data->request;

            return $function($_POST);

        } 
        else 
        {
            return 'Function not defined';
        }

    } 
    else 
    {
        return 'Invalid request, please check the request details';
    }

}

echo json_encode(loadRequest($_POST));
exit;