import Player from '../models/playerModel.js';

export const createPlayer = async (req, res) => {
    const {name, country, team} = req.body;

    let emptyFields = [];
    if (!name) emptyFields.push('name');
    if (!country) emptyFields.push('country');
    if (!team) emptyFields.push('team');

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
