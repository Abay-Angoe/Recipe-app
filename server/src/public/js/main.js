
       
      const resetForm = document.querySelector("#reset-form");

       const token = window.document.URL.split('/').pop()
       
       resetForm.addEventListener("submit", async (event) => {
          event.preventDefault();

           const password = document.querySelector('#password').value;
           const confirmPassword = document.querySelector('#confirm-password').value;
           const errorElement = document.querySelector('#error');
           const successElement = document.querySelector('#success');

           let messages = []
           if (password.length <= 6) {
               messages.push('Password must be longer than 6 characters')
               return
           }
           if (password.length >= 20) {
               messages.push('Password must be less than 20 characters')
               return
           }
           if (password === 'password') {
               messages.push('Password cannot be password')
               return
           }
           if (password !== confirmPassword) {
               messages.push('Confirm password must be the same as password')
               return
           }
           if (messages.length > 0) {
               event.preventDefault()
              errorElement.innerText = messages.join(', ')
              return
           }

           const response = await fetch(`/api/v1/auth/reset-password/${token}`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ password }),
           });
           if (response.status === 200) {
               alert('Password reset successful')
                window.location.href = '/success-reset-password'
           }
          

       }) 
      
