const StatusTypesModel = require('../src/models/status-types.model');

test('Test Status Types Model', async () => {
  const statusTypes = await StatusTypesModel.findAll({
    attributes: ['name', 'value']
  });
  expect(statusTypes.length).toBe(3);
});
