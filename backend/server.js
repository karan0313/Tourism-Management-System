import express from 'express';
import cors from 'cors';
import mongoose, { Schema, model } from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://root:root123@cluster0.ry3pqny.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Atlas connection error:', err));

const bookingSchema = new Schema({
  destination: String,
  state: String,
  fullName: String,
  email: String,
  phone: String,
  travelDate: String,
  numPeople: Number,
  message: String
});

const Booking = model('Booking', bookingSchema);

app.post('/api/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).json({ message: 'Booking saved to MongoDB Atlas!' });
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
