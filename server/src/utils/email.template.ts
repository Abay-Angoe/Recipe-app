const html = async (resetUrl: string, username: string) => {
    try {
        return `
        <p> Use the following link to reset below to reset your password. </p> 
        <p>Dear ${username},</p>
        <p style="color:tomato;"> We received a request to reset your password for your account on Recipe App. To proceed with resetting your password, please click the button below.
        </p> 
        <a href="${resetUrl}" 
           style ="border-radius: 5px;
                   background-color: #F28123;
                   color: white;
                   border: none;
                   font-size: 1.7em;
                   padding:  10px;
                   text-decoration :none ;">Reset Password</a>
        <p>This Link is valid for 1 hour </p>
       
        <p> If you did not request a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next 1 hour. </p>
        `

    } catch (error) {
        throw error;
    }
}

export default html;