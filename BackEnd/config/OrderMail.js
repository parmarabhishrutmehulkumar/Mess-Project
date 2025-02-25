const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "messstaff236@gmail.com",
      pass: "sywd sodu dldy lxzn",
    },
  });
const sendOrderEmail = async ( orderDetails) => {
    
    try {
        const mailOptions = {
            from: `${orderDetails.facultyEmail}`,

            to: 'messstaff236@gmail.com',
            subject: 'New Faculty Order Placed',
            html: `
                <h3>New Order Details</h3>
                <p><strong>Faculty Name:</strong> ${orderDetails.facultyName}</p>
                <p><strong>Faculty Email:</strong> ${orderDetails.facultyEmail}</p>
                <p><strong>Token ID:</strong> ${orderDetails.tokenId}</p>
                <p><strong>Total Price:</strong> ₹${orderDetails.totalPrice}</p>
                <p>Scan the QR code to confirm the order</p>
                <img src="cid:qrcode" alt="QR Code">
                <h4>Ordered Items:</h4>
                <ul>
                    ${Object.values(orderDetails.orderedItems).map(item => `
                        <li>
                            <p><strong>Name:</strong> ${item.name}</p>
                            <p><strong>Quantity:</strong> ${item.quantity}</p>
                            <p><strong>Price:</strong> ₹${item.price}</p>
                        </li>
                    `).join('')}
                </ul>
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