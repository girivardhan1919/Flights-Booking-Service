const cron = require('node-cron');
const { BookingService } = require('../../services');

function scheduleCrons() {
  cron.schedule('*/30 * * * *', async () => {
    await BookingService.cancelOldBookings();
  });
}

module.exports = scheduleCrons;

//To set cron for 5sec -> '*/5 * * * * *'