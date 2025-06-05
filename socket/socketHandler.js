const { supabase } = require('../config/supabaseClient');

module.exports.setupSocketIO = function setupSocketIO(io) {
  io.on('connection', (socket) => {
    console.log('📱 Pengguna terhubung:', socket.id);

    // Event: Kirim pesan
    socket.on('sendMessage', async (messageData) => {
      const { sender_id, receiver_id, message, type = 'text' } = messageData;

      try {
        // Simpan ke Supabase
        await supabase.from('messages').insert([{
          sender_id,
          receiver_id,
          message,
          type
        }]);

        // Kirim ke penerima
        io.to(receiver_id).emit('receiveMessage', {
          ...messageData,
          sent_at: new Date().toISOString()
        });
      } catch (err) {
        console.error('❌ Gagal simpan pesan:', err.message);
        socket.emit('error', { message: 'Gagal mengirim pesan' });
      }
    });

    // Event: Typing indicator
    socket.on('typing', (data) => {
      const { sender_id, receiver_id } = data;
      io.to(receiver_id).emit('userTyping', { user_id: sender_id, is_typing: true });
    });

    // Event: Stop typing
    socket.on('stopTyping', (data) => {
      const { sender_id, receiver_id } = data;
      io.to(receiver_id).emit('userTyping', { user_id: sender_id, is_typing: false });
    });

    // Event: Disconnect
    socket.on('disconnect', () => {
      console.log('📴 Pengguna terputus:', socket.id);
    });
  });
};