self.addEventListener('push', (event) => {
  if (!event.data) return
  const payload = event.data.json()
  const title = payload.title || 'Notifikasi'
  const options = {
    body: payload.body,
    icon: '/assets/icons/dprd-pali-logo.png',
    badge: '/assets/icons/dprd-pali-logo.png',
    data: payload.data || {},
    requireInteraction: true,
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const data = event.notification.data || {}
  const url = data?.refId
    ? `/notification`
    : '/notification'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const c of wins) {
        if ('focus' in c) {
          c.navigate(url)
          return c.focus()
        }
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})
