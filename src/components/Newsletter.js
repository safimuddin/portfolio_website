import {Alert} from "react-bootstrap";
import {useState} from "react";

export const Newsletter = ({ onValidated, status, message}) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (status === 'success') clearFields();
    }, [status])

    const handleSubmit = () => {
        e.preventDefault();
        email && 
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email
        })
    }

    const clearFields = () => {
        setEmail('');
    }

    return (
        <Col lg={12}>
            <div className="newsletter-bx">
                <Row>
                    <Col lg={12} md={6} xl={5}>
                        <h3>Subscribe to our Newsletter</h3>
                        {statusbar === 'sending' && <Alert>Sending...</Alert>}
                        {statusbar === 'error' && <Alert variant="danger">{message}</Alert>}
                        {statusbar === '' && <Alert varient="success">{message}</Alert>}
                    </Col>
                    <Col md={6} xl={7}>
                        <div className="new-email-bx">
                            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                            <button type="submit">Submit</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
})