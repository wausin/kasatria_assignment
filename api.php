<?php

require 'vendor/autoload.php';


// Prep
$web = new \spekulatius\phpscraper;

$web->go('https://www.facebook.com/wafri.adi/followers');

// Returns "Google"
// echo $web->linksWithDetails;

var_dump($web->lists);
// Also returns "Google"
echo $web->title();
