import { makeAutoObservable } from "mobx";
import {getStrategy, IStrategy} from "./Strategy";

export enum PlayerType {
    RandomStrategy = 1,
    StrongStrategy,
    User,
}

export interface IGameLog{
    playerNumber: number;
    playerTaked: number;
    //Осталось
    total: number;
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
    gameIsFinished: boolean;
    //Номер игрока который сейчас делает шаг
    playerStep: number;
    winnerPlayerNumber: number;
    gameLog: IGameLog[];
}

class GameStore {
    game: IGameEntity = {
        totalCount: 24,
        step: 0,
        user1Taked: 0,
        user2Taked: 0,
        player2Type: PlayerType.RandomStrategy,
        user1LastStep: 0,
        user2LastStep: 0,
        gameIsFinished: false,
        winnerPlayerNumber: 1,
        playerStep: 1,
        gameLog: [],
    };

    strategy : IStrategy;
    constructor() {
        makeAutoObservable(this);
        this.strategy = getStrategy(this.game.player2Type);
    }

    public clean(){
        this.game.step = 0;
        this.game.gameIsFinished = false;
        this.game.winnerPlayerNumber = 0;
        this.game.playerStep = 1;
    }

    public initGame(totalCount: number, player2Type: PlayerType) {
        console.log('initGame: ', totalCount, ", ", player2Type)
        this.game.totalCount = totalCount;
        this.game.step = 0;
        this.game.user1Taked = 0;
        this.game.user2Taked = 0;
        this.game.player2Type = player2Type;
        this.game.user1LastStep = 0;
        this.game.user2LastStep = 0;
        this.game.gameIsFinished = false;
        this.game.winnerPlayerNumber = 0;
        this.game.playerStep = 1;
        this.game.gameLog = [];
        this.strategy = getStrategy(this.game.player2Type)
    }

    private checkEndGame(){
        this.game.gameIsFinished = this.game.totalCount <= 0;
        return this.game.gameIsFinished;
    }

    public nextStep(count: number){
        this.game.totalCount -= count;
        this.game.user1Taked += count;
        this.game.user1LastStep = count;
        this.game.step++;
        this.game.gameLog.push({playerNumber: 1, playerTaked: count, total: this.game.totalCount});
        if (this.checkEndGame()){
            this.game.winnerPlayerNumber = 1;
            return;
        }

        this.game.user2LastStep = this.strategy.nextStep(this.game.totalCount);

        this.game.user2Taked += this.game.user2LastStep;
        this.game.totalCount -= this.game.user2LastStep;
        this.game.gameLog.push({playerNumber: 2, playerTaked: this.game.user2Taked, total: this.game.totalCount});
        if (this.checkEndGame()){
            this.game.winnerPlayerNumber = 2;
            return;
        }
    }
}

export const gameStore = new GameStore();

