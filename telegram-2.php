<?php

/* https://api.telegram.org/bot5502997525:AAG7o4Ceg_FmyVG5BmQHuAQNz8O89HZML34/getUpdates */

$variant = trim(urlencode($_POST['variant']));
$name = trim(urlencode($_POST['name']));
$phone = trim(urlencode($_POST['phone']));
$minibar = trim(urlencode($_POST['minibar']));
$minibar = preg_replace( '/\s+/', ' ', $minibar); 
$token = "5502997525:AAG7o4Ceg_FmyVG5BmQHuAQNz8O89HZML34";
$chat_id = "-639345719";
$arr = array(
	'Имя пользователя: ' => $name,
	'Телефон: ' => $phone,
	'Минибар: ' => $minibar,
	'Вариант: ' => $variant,
);

foreach ($arr as $key => $value) {
	$txt .= "<b>" . $key . "</b> " . $value . "%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

if (!$sendToTelegram) {
	echo "Error";
} 
// header('Location: index.html');
?>