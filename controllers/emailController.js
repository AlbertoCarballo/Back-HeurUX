import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // 👈 Evita el error de certificado autofirmado
    },
  });
};


// ✅ Enviar mensaje general desde el sistema
export const sendEmail = async (req, res) => {
  const { para, asunto, descripcion, remitente } = req.body;

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"HeurUX | Sistema de Mensajes" <${process.env.EMAIL_USER}>`,
      to: para,
      subject: `📩 ${asunto || "Nuevo mensaje de HeurUX"}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px;">
          <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 3px 10px rgba(0,0,0,0.05);">

            <div style="background:#3B82F6; padding:20px; color:white; text-align:center;">
              <h2 style="margin:0;">Nuevo mensaje 📧</h2>
            </div>

            <div style="padding:24px;">
              <p><strong>Remitente:</strong> ${remitente}</p>
              <p><strong>Asunto:</strong> ${asunto}</p>
              <p style="margin-top:16px; line-height:1.6; color:#374151;">
                ${descripcion}
              </p>
            </div>

            <div style="background:#F3F4F6; padding:12px; text-align:center;">
              <p style="font-size:14px; color:#6B7280; margin:0;">
                Este mensaje fue enviado desde HeurUX ✅
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Correo enviado correctamente ✅",
    });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    return res.status(500).json({
      success: false,
      message: "Error al enviar el correo",
      error: error.message,
    });
  }
};

// ✅ Enviar invitación a colaborar en un proyecto
export const sendInvitationEmail = async (email, creatorName, link) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"HeurUX" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Invitación a colaborar en un proyecto | HeurUX",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background:#F3F4F6; padding:40px;">
          <div style="max-width:600px; margin:auto; background:white; border-radius:16px; padding:32px; box-shadow:0 8px 25px rgba(0,0,0,0.06);">
            
            <div style="text-align:center; font-size:28px; font-weight:800; margin-bottom:24px;">
              <span style="color:#0C111D;">Heur</span>
              <span style="color:#3B82F6;">UX</span>
            </div>

            <h2 style="color:#0C111D; text-align:center;">¡Has sido invitado a un proyecto! 🎉</h2>
            <p style="color:#6B7280; text-align:center; margin-bottom:24px;">
              ${creatorName} te ha invitado como colaborador en HeurUX.
            </p>

            <div style="text-align:center; margin-bottom:28px;">
              <a href="${link}" style="
                background:#3B82F6;
                color:white;
                padding:14px 26px;
                border-radius:10px;
                text-decoration:none;
                font-weight:600;
                display:inline-block;">
                Ver invitación →
              </a>
            </div>

            <p style="color:#4B5563; font-size:15px; text-align:center;">
              Si ya tienes cuenta, inicia sesión y verás el proyecto.  
              Si no, crea tu cuenta fácilmente.
            </p>

            <hr style="border:0; border-top:1px solid #E5E7EB; margin:30px 0;">

            <p style="color:#9CA3AF; font-size:13px; text-align:center;">
              Este correo fue enviado automáticamente por HeurUX 📎  
              Si no esperabas esta invitación, simplemente ignora este mensaje.
            </p>
          </div>
        </div>
      `,
    });

    console.log(`✅ Invitación enviada a ${email}`);
  } catch (error) {
    console.error("❌ Error al enviar invitación:", error);
  }
};
