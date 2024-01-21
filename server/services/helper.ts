export const isNumber = (n: string): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(Number(n));
};

export const isValidEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const isValidTelegramUrl = (url: string): boolean => {
  if (!url) {
    return false;
  }

  console.log("url ", url);
  const pattern = /^(?:https?:\/\/)?t\.me\/(?!joinchat\/)[a-zA-Z0-9_]+$/;
  const flag = pattern.test(url);

  console.log("flag ", flag);
  return flag;
};

export const emailMarkup = (formData: any): string => {
  const content = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData?.heading}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
  
      h2 {
        color: #333;
      }
  
      p {
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h2>${formData?.heading} info</h2>
  
    <p><strong>Name:</strong>   ${formData?.name}</p>
    <p><strong>Email:</strong>  ${formData?.email}</p>
    <p><strong>Telegram:</strong> ${formData?.telegram} </p>
    <p><strong>Level:</strong>  ${formData?.level}</p>
  
    <p><strong>Message:</strong></p>
    <p>${formData?.message}</p>
  </body>
  </html>
  `;

  return content;
};
