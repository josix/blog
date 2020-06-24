import React, { useState } from "react"

import addToMailchimp from 'gatsby-plugin-mailchimp';

const styles = {
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    border: "1.5px solid rgba(126, 128, 128, 0.76)",
    textAlign: "center",
    padding: 10,
    fontSize: 17,
    margin: 8,
  },
  form: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fieldsGroup: {
    display: 'flex',
    flexDirection: 'column',
    margin: 8,
  },
  textInput: {
    width: '100%',
    borderRadius: 8,
    border: "2px solid #979898c2",
  },
  submitRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  submit: {
    width: '60%',
    maxWidth: 100,
    margin: 10,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    borderRadius: 5,
    fontSize: 15,
    borderColor: "rgb(70, 144, 215)",
    backgroundColor: 'rgb(70, 144, 215)',
    color: "#ffffff",
    cursor: "pointer",
  },
  errorText: {
    color: "#ff4444",
  }
}

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorText, setErrorText] = useState(null);
  const listFields = {
    FNAME: name,
  }
  const _handleSubmit = (email) => {
    addToMailchimp(email, listFields)
    .then(data => {
      // I recommend setting data to React state
      // but you can do whatever you want (including ignoring this `then()` altogether)
      const {
        result,
        msg
      } = data
      console.log(data)
      if (result === "error") {
        setErrorText({__html: msg});
      }
    })
    .catch((data) => {
      console.error(data);
    })
  }

  return (
    <div style={styles.wrapperStyle}>
      <p style={styles.title}>如果想看到最新上架的文章，歡迎填寫下面的表單！</p>
      <form
        style={styles.form}
        onSubmit={(e) => {
        e.preventDefault();
        _handleSubmit(email)
      }}>
          <div style={styles.fieldsGroup}>
            <span>Email:</span>
            <input style={styles.textInput} type="text" onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }} />
          </div>
          <div style={styles.fieldsGroup}>
            <span>我可以怎麼稱呼你：</span>
            <input style={styles.textInput} type="text" onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }} />
          </div>
          {errorText && <div style={styles.errorText} dangerouslySetInnerHTML={errorText} />}
          <div style={styles.submitRow}>
            <input type="submit" style={styles.submit} value="Subscribe" />
          </div>
      </form>
    </div>
  );
}

export default SubscribeForm;