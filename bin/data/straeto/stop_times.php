<?php
$routeData = file_get_contents('routes.txt');
$routeData = explode(PHP_EOL, $routeData);
$routes = array();
$i=0;
foreach ($routeData as $value) {
    if($i>0) {
	    $thisRouteData = explode(',', $value);
	    $thisRouteData = array('route_id' => $thisRouteData[0], 'route_short_name' => $thisRouteData[2]);
	    print_r($thisRouteData);
	    $routes = array_merge($routes, $thisRouteData);
    }
    $i++;					    
}
$timetableData = file_get_contents('stop_times.txt');
$timetableData = explode(PHP_EOL, $timetableData);
$timetable = array();
$i=0;
foreach ($timetableData as $value) {
    if($i>0) {
	    $thisTimetableData = explode(',', $value);
	    $thisTimetableData = array('trip_id' => $thisTimetableData[0], 'arrival_time' => $thisTimetableData[1], 'departure_time' => $thisTimetableData[2], 'stop_id' => $thisTimetableData[3], 'stop_sequence' => $thisTimetableData[3]);
	    $timetable = array_merge($timetable, $thisTimetableData);
    }					    
}
print_r($timetable);
?>