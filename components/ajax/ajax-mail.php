<?
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') die("That's all folks"); //only ajax requests

require_once("../../functions.php");
require_once("../mime/htmlmimemail.php");

function sendMail($from, $text, $subj, $to, $isAdmin = false)
{
    $mail = new htmlMimeMail();
    $mail->setHeadCharset('utf-8');
    $mail->setTextCharset('utf-8');
    $mail->setFrom($from);
    $mail->setText($text);
    $mail->setSubject($subj);
    if ($_FILES['file']['size'] > 0 && $isAdmin) {
        $attachment = $mail->getFile($_FILES['file']['tmp_name']);
        $mail->addAttachment($attachment, $_FILES['file']['name']);
    }
    $mail->send($to);
}

$fields = array(
    "name" => "Имя: ",
    "phone" => "Телефон: ",
    "email" => "E-mail: "
);

$attributes = array(
    "comment" => "Комментарий: "
);

// Admin mail attributes
$subj = g("mail-subject");
if ($subj == "")
    $subj = "Request from " . get_host();
$subj = str_replace(' ', ' ', $subj);

$to = g("email");
$arrto = preg_split("/,/", $to);

$from = g("email-from");
if ($from == "")
    $from = $arrto[0];

// Client mail attributes
$clientSubj = g("client-mail-subject");
if ($clientSubj == "")
    $clientSubj = "Hello from " . get_host();
$clientSubj = str_replace(' ', ' ', $clientSubj);

// Building messages
$msg = "";
$clientMsg = "";

$action = $_POST["action"];

if (!empty($action)) {
    $clientMsg .= g("client-mail-greeting") . trim($_POST["name"]) . "!\n\n";
    $clientMsg .= g("client-mail-body") . "\n\n";
    $clientMsg .= g("client-mail-footer");

    $msg .= g("mail-header") . "\n" . $action . "\n\n" . g("mail-body") . "\n";

    foreach ($attributes as $k => $v) {
        empty($_POST[$k]) or $msg .= $v . trim($_POST[$k]) . "\n";
    }

    foreach ($fields as $k => $v) {
        empty($_POST[$k]) or $msg .= $v . trim($_POST[$k]) . "\n";
    }

    $msg .= "\n";

    $msg .= g("mail-footer");

    $msg = str_replace("*", "\n", $msg);
    $clientMsg = str_replace("*", "\n", $clientMsg);

    // send e-mail to admin
    sendMail($from, $msg, $subj, $arrto, true);
    // Send e-mail to client
    //if (!empty($_POST["email"]))
        //sendMail($from, $clientMsg, $clientSubj, array(trim($_POST["email"])));

    // return message
    echo "1";
} else {
    die("-1");
}