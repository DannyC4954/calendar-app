<?php

function buildCalendar($data)
{

    $month = $data->month;
    $year = $data->year;

    // $firstDay = new DateTime("$year-$month-01");
    // $firstDay = $firstDay->format('Y-m-d');

    // $lastDay = new DateTime("$year-$month-01");
    // $lastDay->modify('next month');
    // $lastDay = $lastDay->modify('-1 day');
    // $lastDay = $lastDay->format('Y-m-d');

    $numDays = cal_days_in_month(CAL_GREGORIAN, $month, $year);

    $days = [];

    for ($day = 1; $day <= $numDays; $day++) 
    {
        $currentDay = sprintf("%04d-%02d-%02d", $year, $month, $day);
        $currentDay = date("Y-m-d", strtotime($currentDay));
        $days['main'][] = $currentDay;
    }
    
    $days['first'] = date('w', strtotime($days['main'][0]));
    $days['starter'] = 0;

    // Resolve issue with Sunday being the first day of the month
    if( date('l', strtotime($days['main'][0])) == 'Sunday' )
    {
        $days['first'] = 7;
    }

    if( $days['first'] > 0 )
    {
        $days['first'] = $days['first'] - 1;
        $days['starter'] = range(1, $days['first']);
    }

    return $days;

}