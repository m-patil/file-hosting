import Player from '../types/Player';
import PlayerStore from './PlayerStore';

const mockCoveyListenerTownDestroyed = jest.fn();
const mockCoveyListenerOtherFns = jest.fn();


describe('PlayerStore', () => {
  beforeEach(() => {
    mockCoveyListenerTownDestroyed.mockClear();
    mockCoveyListenerOtherFns.mockClear();
  });
  it('should be a singleton', () => {
    const playStore1 = PlayerStore.getInstance();
    const playStore2 = PlayerStore.getInstance();
    expect(playStore1).toBe(playStore2);
  });

  describe('addPlayer', () => {
    it('Testing adding players', () => {
      const playStore1 = PlayerStore.getInstance();
      expect(playStore1.getPlayers().length).toBe(0);
      playStore1.addPlayer(new Player('player1', 'player1@coveytown.com'));
      expect(playStore1.getPlayers().length).toBe(1);
      playStore1.addPlayer(new Player('player2', 'player2@coveytown.com'));
      expect(playStore1.getPlayers().length).toBe(2);
    });
  });

  describe('getPlayer', () => {
    it('Should return the player if the player exists', async () => {
        const playStore1 = PlayerStore.getInstance();
        const player1 = new Player('player1', 'player1@coveytown.com');
        playStore1.addPlayer(player1);
        expect(playStore1.getPlayer('player1')).toBe(player1);
        expect(playStore1.getPlayer('player2')).toBe(undefined);
    });
  });

  describe('getPlayerByAuthID', () => {
    it('Should return the player if the player exists by checking against AuthID (email)', () => {
        const playStore1 = PlayerStore.getInstance();
        const player1 = new Player('player1', 'player1@coveytown.com');
        playStore1.addPlayer(player1);
        expect(playStore1.getPlayer('player1@coveytown.com')).toBe(player1);
        expect(playStore1.getPlayer('player2@coveytown.com')).toBe(undefined);

    });
  });

  describe('getPlayers', () => {
    it('Should return a Player Array containing all added Players', () => {
        const playStore1 = PlayerStore.getInstance();
        const player1 = new Player('player1', 'player1@coveytown.com');
        const player2 = new Player('player2', 'player2@coveytown.com');
        const player3 = new Player('player3', 'player3@coveytown.com');
        const player4 = new Player('player4', 'player4@coveytown.com');
        const player5 = new Player('player5', 'player5@coveytown.com');
        playStore1.addPlayer(player1);
        playStore1.addPlayer(player2);
        playStore1.addPlayer(player3);
        playStore1.addPlayer(player4);
        const playerList = playStore1.getPlayers();
        expect(playStore1.getPlayers().length).toBe(4);
        expect(playerList.includes(player1)).toBe(true);
        expect(playerList.includes(player2)).toBe(true);
        expect(playerList.includes(player3)).toBe(true);
        expect(playerList.includes(player4)).toBe(true);
        expect(playerList.includes(player5)).toBe(false);

    });
  });
});
