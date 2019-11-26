<?php
$header = file_get_contents('../html/header_inicio_login.html');
$footer = file_get_contents('../html/footer.html');
$strHtml = file_get_contents('../html/profile.html');
setcookie("foo", "bar");
$nombre = "Nombre: " . htmlspecialchars($_COOKIE["/nomber"]);
$email = "Email: " . htmlspecialchars($_COOKIE["/email"]);
$edad = "Edad: " . htmlspecialchars($_COOKIE["/edad"]);

$nombre = str_replace("%20", " ", $nombre);


if(count($_COOKIE) > 0) {
    echo "Cookies are enabled.";
} else {
    echo "Cookies are disabled.";
}
echo $nombre;
$newHtml = str_replace("Nombre: ", $nombre, $strHtml);



$finalHtml = $header . $newHtml . $footer;

echo html_entity_decode($finalHtml, ENT_QUOTES, "UTF-8");


?>