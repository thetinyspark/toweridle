import Fighter from "../schema/Fighter";
export declare type GameOverInfoType = {
    gameover: boolean;
    isDoorDead: boolean;
    winners: Fighter[];
    defenders: Fighter[];
    attackers: Fighter[];
    defenderWins: boolean;
    attackerWins: boolean;
};
