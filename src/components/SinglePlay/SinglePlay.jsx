import GameBoard from "../GameBoard/GameBoard";
import GameTitle from "../GameTitle/GameTitle";
import InstructionsModal from "../InstructionsModal/InstructionsModal";

const SinglePlay = () => {
    return (
        <>
            <div className="game__single">
                <GameTitle text={"Бой против бота"} />
                <GameBoard mode="single" />
            </div>
            <InstructionsModal />
        </>
    );
};

export default SinglePlay;
