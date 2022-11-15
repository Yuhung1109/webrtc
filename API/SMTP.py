import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText



def sent_mail(mail, Verify_Code):
    content = MIMEMultipart()  
    content["subject"] = "Swagger Platform Verification"  # title
    content["from"] = "energyuser118@gmail.com"  # sender
    content["to"] = mail # receiver
    content.attach(MIMEText("Your Verify Code is " + Verify_Code))  # The 
    with smtplib.SMTP(host="smtp.gmail.com", port="587") as smtp:  # STMP server
        try:
            smtp.ehlo()  
            smtp.starttls()  
            smtp.login("energyuser118@gmail.com", "zdjntamgzljzcfal")  # login the seder mail
            smtp.send_message(content)  
            print("Complete!")
        except Exception as e:
            print("Error message: ", e)


