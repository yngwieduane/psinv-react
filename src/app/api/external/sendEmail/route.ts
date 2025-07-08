import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";


const handler = async(req:NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        res.status(200).json({ message: "This endpoint is working!" });
    } else if (req.method === "POST") {
        const { name, email, phone, purpose, propType, bedroom, location, property } = req.body.remarks;
        const sendToMail = req.body.sendtomail;
    
        try {
            const transporter = nodemailer.createTransport({
                host: "localhost", // Replace with your SMTP server
                port: 25,
                secure: false,
                auth: {
                    user: "register@psiwebs.com",
                    pass: "Reg@98761234@Web",
                },
                tls: {
                    rejectUnauthorized: false, // ✅ in case of self-signed certs (localhost)
                },
            });
        
            //mail options
            const mailOptions = {
                from: '"Property Shop Investment" <register@psi.properties>',
                to : sendToMail,
                subject: "New Inquiry from List Your Property Page Form",
                text: req.body,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: "Email sent successfully" });
            console.log("Sent");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to send email." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    };