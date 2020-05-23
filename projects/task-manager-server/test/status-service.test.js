const StatusService = require('../src/services/status-service');

test('Test Status Types Service', async function () {
  const statusService = new StatusService();
  const statusTypes = await statusService.getStatusTypes();
  expect(statusTypes.length).toBe(3);
});
