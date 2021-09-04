const Talks = () => {
    return <div className="transition duration-200 ease transform-gpu hover:scale-110
    max-w-xs min-w-0 rounded overflow-hidden shadow-lg my-2">
        <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">My Talk</div>
            <p className="text-grey-darker text-base">
                What the talk is about
            </p>
        </div>
    </div>
}

export default Talks;
