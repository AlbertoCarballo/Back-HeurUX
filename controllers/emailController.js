import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
    const { para, asunto, descripcion, remitente } = req.body; // incluimos remitente

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Modificamos el asunto para incluir el remitente
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: para,
            subject: `Remitente ${remitente} te ha enviado: ${asunto}`,
            text: descripcion
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Correo enviado correctamente ✅" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ success: false, message: "Error al enviar el correo", error });
    }
};
