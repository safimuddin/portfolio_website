const express = require("express");
const router = express.Routher();
const cors = require("cors");
odemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "safimuddin2005@gmail.com",
        pass: "pvyc lnnz vlhi mvtz"
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
        from: name,
        to: "safimuddin2005@gmail.com",
        subject: "Form Submission - Website",
        html:   `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Email: ${email}</p>
                <p>Email: ${email}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({code: 200, status: "Message Sent"});
        }
    });
})