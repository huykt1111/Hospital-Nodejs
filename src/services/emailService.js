require('dotenv').config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Booking Appoitment 👻" <huylmht10@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "THÔNG TIN ĐẶT LỊCH KHÁM BỆNH ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: getBodyHtmlEmail(dataSend),
    });
}

let getBodyHtmlEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You received this email because you booked online on the BookingCare website!/</p>
            <p>Information to book a medical appointment</p>
            <div>
                <b>Time: ${dataSend.time}</b><br/>
                <b>Doctor: ${dataSend.doctorName}</b>
            </div>
            <p>If the information is true, please click on the link below to confirm and complete the procedure to book an appointment.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Thank you very much for trusting and using our website!</div>
            `
    }
    if (dataSend.language === 'vi') {
        result =
            `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt online trên web BookingCare!/</p>
            <p>Thông tin đặt lịch khám bệnh</p>
            <div>
                <b>Thời gian: ${dataSend.time}</b><br/>
                <b>Bác sĩ: ${dataSend.doctorName}</b>
            </div>
            <p>Nếu các thông tin là đúng sự thật vui lòng click vào đường link bên dưới để xác nhận và hoàn
            tất thủ tục đặt lịch khám bệnh.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Click vào đây!</a>
            </div>
            <div>Xin chân thành cảm ơn đã tin tưởng và sử dụng trang web của chúng tôi!</div>
            `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}