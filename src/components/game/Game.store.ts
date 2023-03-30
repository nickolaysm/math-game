import { makeAutoObservable } from "mobx";

export enum PlayerType {
    RandomProgram = 1,
    StrongProgram,
    User,
}

interface IGameEntity {
    // Всего спичек
    totalCount: number;
    // Номер текущего шага
    step: number;
    //Пользователь 1 уже взял спичек
    user1Taked: number;
    //Пользователь 2 уже взял спичек
    user2Taked: number;
    //Тип пользователя2
    player2Type: PlayerType;
    user1LastStep: number;
    user2LastStep: number;
}

class GameStore {
    game: IGameEntity = {
        totalCount: 24,
        step: 0,
        user1Taked: 0,
        user2Taked: 0,
        player2Type: PlayerType.RandomProgram,
        user1LastStep: 0,
        user2LastStep: 0
    };

    constructor() {
        makeAutoObservable(this);
    }

    public initGame(totalCount: number, player2Type: PlayerType) {
        this.game.totalCount = totalCount;
        this.game.step = 0;
        this.game.user1Taked = 0;
        this.game.user2Taked = 0;
        this.game.player2Type = player2Type;
        this.game.user1LastStep = 0;
        this.game.user2LastStep = 0;
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    public nextStep(count: number){
        this.game.totalCount -= count;
        this.game.user1Taked += count;
        this.game.user1LastStep = count;
        this.game.step++;
        this.game.user2LastStep = 0;
        if(this.game.player2Type == PlayerType.RandomProgram){
            this.game.user2LastStep = this.getRandomInt(4);
        }
        this.game.user2Taked += this.game.user2LastStep;
        this.game.totalCount -= this.game.user2LastStep;
    }
}

export const gameStore = new GameStore();
