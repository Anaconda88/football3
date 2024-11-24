import Player from '../models/playerModelis.js';
import mongoose from 'mongoose';

export const getPlayers = async (req, res) => {
    const players = await Player.find({}).sort({createAt: -1});
    res.status(200).json(players);
};

export const getPlayer = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio žaidėjo nėra'});
    }
    const player = await Player.findById(id);
    if (!player) {
        return res.status(404).json({error: 'Tokio žaidėjo nėra'});
    }
    res.status(200).json(player);
};

export const createPlayer = async (req, res) => {
    const {name, country, team} = req.body;
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    }
    if (!country) {
        emptyFields.push('country');
    }
    if (!team) {
        emptyFields.push('team');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: 'Prašome užpildyti visus laukelius',
            emptyFields,
        });
    }

    try {
        const player = await Player.create({name, country, team});
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const updatePlayer = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio žaidėjo nėra'});
    }

    const player = await Player.findOneAndUpdate(
        {_id: id},
        {...req.body},
        {new: true},
    );
    if (!player) {
        return res.status(404).json({error: 'Tokio žaidėjo nėra'});
    }
    res.status(200).json(player);
};

export const deletePlayer = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio žaidėjo nėra'});
    }

    const player = await Player.findOneAndDelete({_id: id});
    if (!player) {
        return res.status(404).json({error: 'Tokio žaidėjo nėra'});
    }
    res.status(200).json({message: 'Žaidėjas sėkmingai ištrintas', player});
};
