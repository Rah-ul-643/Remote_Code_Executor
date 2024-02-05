function otpTemplate(otp) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .email-content {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            .email-content h1 {
                color: #444444;
            }
            .email-content p {
                color: #666666;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
            }
        </style>
    </head>
    <body>
        <div class="email-content">
            <h1>CodeNova</h1>
            <p>Dear User,</p>
            <p>Your One-Time Password (OTP) is:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for 10 minutes. Do not share this OTP with anyone.</p>
            <p>Best,</p>
            <p>CodeNova Team</p>
        </div>
    </body>
    </html>
    `;
}
module.exports = {otpTemplate};