import {PlayerType} from "./Game.store";

export interface IStrategy {
    /**
     * Сделать следующий шаг. Возвращает сколько взять спичек
     * @param totalCount сколько спичек еще осталось в куче
     */
    nextStep(totalCount: number):number;
}

/**
 * Возвращает случайное значение от 1 до 4
 */
export function randomStep(): number{
    return Math.floor(Math.random() * 4) + 1
}

export function getStrategy(playerType: PlayerType): IStrategy{
    if(playerType == PlayerType.RandomStrategy){
        return new RandomStrategy();
    }else if(playerType == PlayerType.StrongStrategy){
        return new StrongStrategy();
    }else{
        return new RandomStrategy();
    }
}

export class RandomStrategy implements IStrategy{
    nextStep(totalCount: number): number {
        console.log("randomStrategy");
        let nextStep: number = 0;
        while(nextStep == 0 || nextStep > totalCount) {
            nextStep = randomStep();
        }
        return nextStep;
    }
}

export class StrongStrategy implements IStrategy{
    nextStep(totalCount: number): number {
        console.log("StrongStrategy");
        // По возможности нужно взять столько спичек, что бы в куче осталось количество спичек кратное 5
        for(let nextStep = 1; nextStep <= 4; ++nextStep){
            console.log("totalCount:", totalCount, "nextStep:",nextStep, ";", (totalCount - nextStep) % 5 == 0)
            if( (totalCount - nextStep) % 5 == 0){
                return nextStep;
            }
        }
        return randomStep();
    }
}
