<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registration Approved</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 20px;">
    <!-- Logo Row (at the top) -->
   
    <!-- Header Section -->
    <tr>
      <td align="center" style="padding: 20px 0; background-color: #2a2a2a;">
        <h1 style="margin: 0; color: #f4f4f4; font-size: 28px;">Your Registration is Approved!</h1>
      </td>
    </tr>
    <!-- Content Section -->
    <tr>
      <td style="padding: 40px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #153643; font-size: 16px; line-height: 24px;">
              <p>Hello, {{ $registration->user->nom ?? $registration->user->name }}!</p>
              <p>Your registration for the formation "<strong>{{ $registration->formation->title }}</strong>" has been approved.</p>
              <p>Thank you for choosing our training center! We are excited to have you on board.</p>
            </td>
          </tr>
          <tr>
            <td style="color: #153643; font-size: 16px;">
              <p>Best regards,</p>
              <p>Your Training Center Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td bgcolor="#2a2a2a" style="padding: 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #ffffff; font-size: 14px;" width="75%">
              &copy; 2025 Training Center. All rights reserved.
            </td>
            <td align="right" width="25%">
              <a href="{{ url('/https://www.google.com/') }}" style="color: #ffffff; text-decoration: none;">Visit our website</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
