// import {Resend} from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendVerificationEmail = async (email: string, token: string) => {
//     const urlLink = `http://localhost:3000/auth/new-verification?token=${token}`;
//     await resend.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "Verify your email address",
//         html : `<p>Click <a href="${urlLink}">here</a> to verify your email address</p>`
//     })
// }