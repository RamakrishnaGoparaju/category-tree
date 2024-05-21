const Category = require('../models/Category');

describe('Categories API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Category.deleteMany({});
  });

  test('should add a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({
        name: 'New Category'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('New Category');
  });

  test('should edit an existing category', async () => {
    const category = new Category({ name: 'Old Category' });
    await category.save();

    const res = await request(app)
      .patch(`/api/categories/${category._id}`)
      .send({
        name: 'Updated Category'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Updated Category');
  });

  test('should delete a category', async () => {
    const category = new Category({ name: 'Category to Delete' });
    await category.save();

    const res = await request(app)
      .delete(`/api/categories/${category._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Category deleted');
  });
});