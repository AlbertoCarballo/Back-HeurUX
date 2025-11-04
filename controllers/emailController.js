import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
    const { para, asunto, descripcion, remitente } = req.body;

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

        const mailOptions = {
            from: `"Sistema de Mensajes" <${process.env.EMAIL_USER}>`,
            to: para,
            subject: `📩 Nuevo mensaje de HeurUX`,
            html: `
            <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
                <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden;">

                    <div style="background:#2563eb; padding:20px; color:white; text-align:center;">
                        <h2 style="margin:0;">Nuevo Mensaje 📧</h2>
                    </div>

                    <div style="padding:20px;">
                        <p style="font-size:16px; color:#333;">
                            <strong>Remitente:</strong> ${remitente}
                        </p>

                        <p style="font-size:16px; color:#333;">
                            <strong>Asunto:</strong> ${asunto}
                        </p>

                        <p style="font-size:16px; margin-top:20px; line-height:1.6; color:#555;">
                            ${descripcion}
                        </p>
                    </div>

                    <div style="background:#f1f1f1; padding:15px; text-align:center;">
                        <p style="font-size:14px; margin:0; color:#666;">
                            Este mensaje fue enviado a través de tu plataforma ✅
                        </p>
                    </div>

                </div>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Correo enviado correctamente ✅" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ success: false, message: "Error al enviar el correo", error });
    }
};
