import mongoose from 'mongoose';

const newsletterSchmea = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    validate: {
      validator: (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        return regex.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

const Newsletter = mongoose.model('Newsletter', newsletterSchmea);

export default Newsletter;
