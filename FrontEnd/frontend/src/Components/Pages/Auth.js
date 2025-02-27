import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Auth.css";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [step, setStep] = useState("send");
  const [successMessage, setSuccessMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/", { email,otp }, { headers: { "Content-Type": "application/json" } });
      const data = await res.data;
      console.log(data);
      setReceivedOtp(data.otp);

      if (data.otp) {
        setMessage(true);
        setStep("verify");
      } else {
        setAlertMessage(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage(true);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify", { email, otp }, { headers: { "Content-Type": "application/json" } });
      const data = await res.data;
      if (data.message === 'OTP verified successfully') {
        setSuccessMessage(true);
        navigate("/home");
      } else {
        setInvalidMessage(true);
      }
    } catch (error) {
      console.log(error);
      setInvalidMessage(true);
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Enter OTP</h1>
          <form style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === "verify"}
            />
            {step === "verify" && (
              <>
                <label style={styles.label}>OTP</label>
                <input
                  style={styles.input}
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </>
            )}
            {step === "send" ? (
              <button style={styles.button} type="submit" onClick={handleSendOtp}>Send OTP</button>
            ) : (
              <button style={styles.button} type="submit" onClick={handleVerifyOtp}>Verify OTP</button>
            )}
          </form>
        </div>
      </div>
      <div>
        <Snackbar
          open={alertMessage}
          autoHideDuration={6000}
          onClose={() => setAlertMessage(false)}
        >
          <Alert severity="error" onClose={() => setAlertMessage(false)}>OTP not sent</Alert>
        </Snackbar>

        <Snackbar
          open={message}
          autoHideDuration={6000}
          onClose={() => setMessage(false)}
        >
          <Alert severity="success" onClose={() => setMessage(false)}>OTP sent successfully</Alert>
        </Snackbar>

        <Snackbar
          open={successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(false)}
        >
          <Alert severity="success" onClose={() => setSuccessMessage(false)}>OTP verified successfully</Alert>
        </Snackbar>

        <Snackbar
          open={invalidMessage}
          autoHideDuration={6000}
          onClose={() => setInvalidMessage(false)}
        >
          <Alert severity="error" onClose={() => setInvalidMessage(false)}>Invalid OTP. Please try again.</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282C34',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#282C34',
    border: '1px solid #4caf50',
    borderRadius: '4px',
  },
  title: {
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#4caf50',
  },
  input: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#282C34',
    color: '#4caf50',
    border: '1px solid #4caf50',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#282C34',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  switchText: {
    color: '#4caf50',
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#4caf50',
    textDecoration: 'underline',
    marginLeft: '5px',
  },
};

export default Auth;