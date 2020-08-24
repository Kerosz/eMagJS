import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [6, 'Username must be at least 6 characters'],
    maxlength: [15, 'Password must be at most 15 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    index: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          email
        );
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [18, 'Password must be at most 18 characters'],
  },
  name: { type: String, required: false, default: null },
  alias: { type: String, required: false, default: null },
  phone: { type: Number, required: false, default: null },
  addresses: {
    type: Array,
    of: Object,
    required: false,
    default: [],
  },
  birthday: { type: Date, required: false, default: null },
  date: { type: Date, required: true, default: Date.now, immutable: true },
  avatar: { type: String, required: true, default: '/img/avatar.jpg' },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model('User', userSchema);

export default User;
