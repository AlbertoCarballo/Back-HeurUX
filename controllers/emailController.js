import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { para, asunto, descripcion, remitente } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
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
            `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Correo enviado correctamente ✅" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al enviar el correo", error });
  }
};

export async function sendInvitationEmail(email, creatorName, link) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from: `"HeurUX" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Invitación a colaborar en un proyecto | HeurUX",
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#F3F4F6; padding:40px;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:16px; padding:32px; box-shadow:0 8px 25px rgba(0,0,0,0.06);">
      
      <!-- LOGO -->
      <div style="text-align:center; font-size:28px; font-weight:800; margin-bottom:24px;">
        <span style="color:#0C111D;">Heur</span>
        <span style="color:#3B82F6;">UX</span>
      </div>

      <!-- Title -->
      <h2 style="color:#0C111D; font-size:24px; margin-bottom:12px; font-weight:700; text-align:center;">
        ¡Has sido invitado a un proyecto! 🎉
      </h2>

      <!-- Subtitle -->
      <p style="color:#6B7280; font-size:16px; text-align:center; margin-bottom:28px;">
        ${creatorName} quiere que colabores como tester en un proyecto dentro de HeurUX.
      </p>

      <!-- Call to action container -->
      <div style="text-align:center; margin-bottom:28px;">
        <a href="${link}" 
        style="
          background:#3B82F6;
          color:white;
          padding:14px 26px;
          border-radius:10px;
          text-decoration:none;
          font-size:16px;
          font-weight:600;
          display:inline-block;
          transition:0.3s;
        ">
          Ver invitación →
        </a>
      </div>

      <!-- Description -->
      <p style="color:#4B5563; font-size:15px; text-align:center; margin-bottom:32px; line-height:1.6;">
        Si ya tienes cuenta, inicia sesión y verás el proyecto en tu panel.  
        Si no, podrás crear tu cuenta rápidamente.
      </p>

      <!-- Divider -->
      <hr style="border:0; border-top:1px solid #E5E7EB; margin:30px 0;">

      <!-- Footer -->
      <p style="color:#9CA3AF; font-size:13px; text-align:center;">
        Este correo fue enviado automáticamente por HeurUX 📎  
        Si no esperabas esta invitación, simplemente ignora este mensaje.
      </p>

    </div>
  </div>
  `,
  });
}
