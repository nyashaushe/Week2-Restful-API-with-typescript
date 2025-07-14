import request from 'supertest';
import app from '../index';
import { Review } from '../interfaces/Review';

describe('Reviews API Endpoints', () => {
  it('should create a new review', async () => {
    const res = await request(app)
      .post('/reviews')
      .send({
        name: 'Test Review',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Review');
  });

  it('should get all reviews', async () => {
    await request(app)
      .post('/reviews')
      .send({
        name: 'Another Review',
      });
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a review', async () => {
    const reviewRes = await request(app)
      .post('/reviews')
      .send({
        name: 'To Be Updated',
      });
    const reviewId = reviewRes.body.id;

    const res = await request(app)
      .put(`/reviews/${reviewId}`)
      .send({
        name: 'Updated Review Name',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Review Name');
  });

  it('should delete a review', async () => {
    const reviewRes = await request(app)
      .post('/reviews')
      .send({
        name: 'To Be Deleted',
      });
    const reviewId = reviewRes.body.id;

    const res = await request(app).delete(`/reviews/${reviewId}`);
    expect(res.statusCode).toEqual(204);

    const allReviewsRes = await request(app).get('/reviews');
    const deletedReview = allReviewsRes.body.find((r: Review) => r.id === reviewId);
    expect(deletedReview).toBeUndefined();
  });
});
