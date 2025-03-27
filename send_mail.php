<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php'; // PHPMailer and dotenv

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo json_encode(["error" => "All fields are required!"]);
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME'];
        $mail->Password = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['MAIL_PORT'];

        // Email Settings
        $mail->setFrom($email, $name);
        $mail->addAddress('vk7032332758@gmail.com'); // Change to recipient email
        $mail->Subject = "New Registration Form Submission";
        $mail->Body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message";

        if ($mail->send()) {
            echo json_encode(["success" => "Email sent successfully!"]);
        } else {
            echo json_encode(["error" => "Email not sent."]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Mail Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
?>
