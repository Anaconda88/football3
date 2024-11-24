import express from 'express';
import * as controller from '../controllers/controller.js';

const router = express.Router();

router.get('/', controller.getPlayers);

router.get('/:id', controller.getPlayer);

router.post('/', controller.createPlayer);

router.put('/:id', controller.updatePlayer);

router.delete('/:id', controller.deletePlayer);

export default router;
