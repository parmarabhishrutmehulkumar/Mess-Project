const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'messstaff236@gmail.com', // Replace with your email
        pass: 'sywd sodu dldy lxzn'  // Use App Password if 2FA is enabled
    }
});

const sendOrderEmail = async (staffEmail, orderDetails) => {
    try {
        const mailOptions = {
            from: 'messstaff236@gmail.com',
            to: staffEmail,
            subject: 'New Faculty Order Placed',
            html: `
                <h3>New Order Details</h3>
                <p><strong>Faculty Name:</strong> ${orderDetails.facultyName}</p>
                <p><strong>Faculty Email:</strong> ${orderDetails.facultyEmail}</p>
                <p><strong>Token ID:</strong> ${orderDetails.tokenId}</p>
                <p><strong>Total Price:</strong> ₹${orderDetails.totalPrice}</p>
                <p>scan the qr code to confirm the order</p>
                <img src=${orderDetails.qrCodeDataUrl} alt="QR Code"></img>
                <h4>Ordered Items:</h4>
                <ul>
                    ${Object.values(orderDetails.orderedItems).map(item => `
                        <li>
                            <p><strong>Name:</strong>${item.name}</p>
                            <p><strong>Quantity:</strong> ${item.quantity}</p>
                            <p><strong>Price:</strong> ₹${item.price}</p>
                        </li>
                    `).join('')}
                </ul>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Order email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendOrderEmail };