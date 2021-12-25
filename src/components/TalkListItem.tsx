import Talk from "../types/talk";

const TalkListItem = ({title, description, date, place}: Talk) => {
    return <div className="m-6 text-white grid md:grid-cols-2 rounded-xl shadow-xl p-2 border-2">
            <div className="text-black m-2 p-6 bg-white">
                <div className="text-gray-500 text-2xl font-bold">{title}</div>
                <div>{description}</div>
                <div>{date} - {place}</div>
            </div>
            <div className="text-black m-2 flex p-6 bg-white"/>
        </div>
}


export default TalkListItem;
