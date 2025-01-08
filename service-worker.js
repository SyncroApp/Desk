self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
    const data = event.data.json();
  
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'logo192.png',
    });
  });
  