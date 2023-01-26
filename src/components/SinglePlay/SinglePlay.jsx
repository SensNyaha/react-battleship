import { useState } from "react";
import GameBoard from "../GameBoard/GameBoard";
import GameTitle from "../GameTitle/GameTitle";
import InstructionsModal from "../InstructionsModal/InstructionsModal";

const SinglePlay = () => {
    const [showInst, setShowInst] = useState(true);
    return (
        <>
            <div className="game__single">
                <GameTitle text={"Бой против бота"} />
                <GameBoard mode="single" />
            </div>
            {showInst ? <InstructionsModal setShowInst={setShowInst} /> : null}
        </>
    );
};

export default SinglePlay;
