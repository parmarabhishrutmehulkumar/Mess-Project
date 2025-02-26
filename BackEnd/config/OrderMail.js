const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "messstaff236@gmail.com", 
        pass: "sywd sodu dldy lxzn", 
    },
});

const sendOrderEmail = async (facultyEmail, orderDetails) => {
    try {
        const mailOptions = {
            from: facultyEmail, // Faculty's email as sender
            to: 'messstaff236@gmail.com', // Mess staff email
            subject: 'New Faculty Order Placed',
            html: `
                <h3>New Order Details</h3>
                <p><strong>Faculty Name:</strong> ${orderDetails.facultyName}</p>
                <p><strong>Meal Category:</strong> ${orderDetails.mealCategory}</p>
                <p><strong>Token ID:</strong> ${orderDetails.tokenId}</p>
                <p>Scan the QR code to confirm the order</p>
                <img src="cid:qrcode" alt="QR Code">
            `,
            attachments: [{
                filename: 'qrcode.png',
                content: orderDetails.qrCodeDataUrl.split(',')[1], // Extract base64 data
                encoding: 'base64',
                cid: 'qrcode' // Content ID used in <img src="cid:qrcode">
            }]
        };

        await transporter.sendMail(mailOptions);
        console.log('Order email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendOrderEmail };