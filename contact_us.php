<?php
// 1. Database Configuration
$db_hostname = "127.0.0.1";
$db_username = "root";
$db_password = "";
$db_name     = "tour"; // Make sure you have created a database named 'tour' in phpMyAdmin

// 2. Establish Connection
$conn = mysqli_connect($db_hostname, $db_username, $db_password, $db_name);

// Check connection
if (!$conn) {
    die("Database Connection Failed. Please ensure XAMPP MySQL is running.");
}

// 3. Process Form Submission Safely
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Safely capture the form data
    $name    = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email   = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone   = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Simple Validation Guard
    if (empty($name) || empty($email) || empty($message)) {
        die("Error: Please fill in all required fields (Name, Email, and Message).");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Error: Invalid email format.");
    }

    // 4. Secure Database Insertion (Prepared Statements)
    // Make sure your database table is named 'contact' and the columns match exactly.
    $sql = "INSERT INTO contact (Name, Email, Phone, Subject, Message) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = mysqli_prepare($conn, $sql);
    
    if ($stmt) {
        // Bind the parameters ('sssss' means 5 strings)
        mysqli_stmt_bind_param($stmt, "sssss", $name, $email, $phone, $subject, $message);
        
        // Execute the query
        if (mysqli_stmt_execute($stmt)) {
            // Success! Show an alert and redirect back to the homepage
            echo "<script>
                    alert('Thank you! Your custom tour inquiry has been submitted successfully.');
                    window.location.href = 'index.html';
                  </script>";
        } else {
            // Execution failed
            echo "Error saving data: " . mysqli_error($conn);
        }
        
        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        // Preparation failed (usually means the table or columns don't exist in the database)
        echo "Database Error: Could not prepare statement. " . mysqli_error($conn);
    }
}

// Close the connection
mysqli_close($conn);
?>