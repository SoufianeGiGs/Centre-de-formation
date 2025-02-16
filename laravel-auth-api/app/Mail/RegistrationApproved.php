<?php

namespace App\Mail;

use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegistrationApproved extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;

    public function __construct(Registration $registration)
    {
        $this->registration = $registration;
    }

    public function build()
    {
        // Get the logo file data from the public/images directory
        $logoPath = public_path('images/logo.png');
        $logoData = file_get_contents($logoPath);

        return $this->subject('Your Registration is Approved!')
                    ->view('emails.registration_approved')
                    ->attachData($logoData, 'logo.png', [
                        'mime' => 'image/png',
                        'contentId' => 'logo-image',
                    ]);
    }
}
