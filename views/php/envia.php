<?php
include('../html/header_inicio.html');
?>
<?php
    $remitente = $_POST['email'];
    $destinatario = 'piccloud.site@gmail.com';
    $asunto = 'text'; 
    if (!$_POST){
?>

<?php
    }else{
	 
        $cuerpo = "Nombre: " . $_POST["name"] . "\r\n"; 
        $cuerpo .= "Correo Electronico: " . $_POST["email"] . "\r\n";
        $cuerpo = "Asunto: " . $_POST["subject"] . "\r\n"; 
        $cuerpo .= "Número de Teléfono: " . $_POST["phone"] . "\r\n";
    	$cuerpo .= "¿Cómo podemos ayudarte?: " . $_POST["text"] . "\r\n";
    
        $headers  = "MIME-Version: 1.0\n";
        $headers .= "Content-type: text/plain; charset=utf-8\n";
        $headers .= "X-Priority: 3\n";
        $headers .= "X-MSMail-Priority: Normal\n";
        $headers .= "X-Mailer: php\n";
        $headers .= "From: \"".$_POST['nombre']." ".$_POST['subject']."\" <".$remitente.">\n";

    mail($destinatario, $asunto, $cuerpo, $headers);
}
?>
<?php
include('../html/contacto.html');
?>
<?php
include('../html/footer.html');
?>