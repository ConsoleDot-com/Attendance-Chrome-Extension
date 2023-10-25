const updateQRCode = async () => {
  try {
    const response = await fetch('https://ams-api.vercel.app/api/v1/qr');
    const data = await response.json();
    const val = data?.key;

    // Remove the previous QR code
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';

    // Generate the new QR code
    const qrcode = new QRCode(qrcodeDiv, {
      text: val,
      width: 256,
      height: 256,
    });
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error(error);
  }
};

// Initial data fetch and QR code generation
updateQRCode();

// Set up an interval to fetch data and update QR code every 3 seconds
const intervalId = setInterval(updateQRCode, 3000);

// Clean up the interval when leaving the page
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
});
