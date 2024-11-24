import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        team: {
            type: String,
            required: true,
        },
    },
    {timestamps: true},
);

export default mongoose.model('Player', playerSchema);
