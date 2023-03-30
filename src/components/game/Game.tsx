import { observer } from "mobx-react-lite"
import {gameStore, PlayerType} from "./Game.store";

const Game = () =>{
    return (
        <div>

            Шаг: {gameStore.game.step},
            Спичек в куче: {gameStore.game.totalCount},
            Пользователь 2 взял: {gameStore.game.user2LastStep}



            <button onClick={()=>gameStore.nextStep(1)}>1</button>
            <button onClick={()=>gameStore.nextStep(2)}>2</button>
            <button onClick={()=>gameStore.nextStep(3)}>3</button>
            <button onClick={()=>gameStore.nextStep(4)}>4</button>

            <button onClick={()=>gameStore.initGame(24, PlayerType.RandomProgram)}>Новая игра</button>
        </div>
    )
}

export default observer(Game)