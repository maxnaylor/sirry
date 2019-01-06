<?php
session_start();
session_destroy();

// Redirects user
header('Location: ../../login.php');
?>