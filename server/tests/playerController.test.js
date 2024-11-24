const {createPlayer} = require('../src/controllers/playerController');
const Player = require('../src/models/playerModel');

jest.mock('../src/models/playerModel');

describe('createPlayer Function Tests', () => {
    it('should create a new player and return it', async () => {
        // Arrange
        const req = {
            body: {
                name: 'Lionel Messi',
                country: 'Argentina',
                team: ': Inter Miami CF',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Player.create.mockResolvedValue(req.body);

        // Act
        await createPlayer(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return an error if required fields are missing', async () => {
        const req = {
            body: {
                country: 'Argentina',
                // trūksta name ir team
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Act
        await createPlayer(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Prašome užpildyti visus laukelius',
            emptyFields: ['name', 'team'],
        });
    });
});
